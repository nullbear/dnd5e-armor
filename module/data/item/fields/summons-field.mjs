import CompendiumBrowser from "../../../applications/compendium-browser.mjs";
import TokenPlacement from "../../../canvas/token-placement.mjs";
import simplifyRollFormula from "../../../dice/simplify-roll-formula.mjs";
import { formatCR, simplifyBonus, staticID } from "../../../utils.mjs";
import { FormulaField, IdentifierField } from "../../fields.mjs";

const {
  ArrayField, BooleanField, DocumentIdField, EmbeddedDataField, NumberField, SchemaField, SetField, StringField
} = foundry.data.fields;

/**
 * A field for storing summons data.
 *
 * @param {object} [options={}]  Options to configure this field's behavior.
 */
export default class SummonsField extends EmbeddedDataField {
  constructor(options={}) {
    super(SummonsData, foundry.utils.mergeObject({ required: false, nullable: true, initial: null }, options));
  }
}

/**
 * Information for a single summoned creature.
 *
 * @typedef {object} SummonsProfile
 * @property {string} _id         Unique ID for this profile.
 * @property {string} count       Formula for the number of creatures to summon.
 * @property {string} cr          Formula for the CR of summoned creatures if in CR mode.
 * @property {object} level
 * @property {number} level.min   Minimum level at which this profile can be used.
 * @property {number} level.max   Maximum level at which this profile can be used.
 * @property {string} name        Display name for this profile if it differs from actor's name.
 * @property {Set<string>} types  Types of summoned creatures if in CR mode.
 * @property {string} uuid        UUID of the actor to summon if in default mode.
 */

/**
 * Data model for summons configuration.
 *
 * @property {object} bonuses
 * @property {string} bonuses.ac            Formula for armor class bonus on summoned actor.
 * @property {string} bonuses.hd            Formula for bonus hit dice to add to each summoned NPC.
 * @property {string} bonuses.hp            Formula for bonus hit points to add to each summoned actor.
 * @property {string} bonuses.attackDamage  Formula for bonus added to damage for attacks.
 * @property {string} bonuses.saveDamage    Formula for bonus added to damage for saving throws.
 * @property {string} bonuses.healing       Formula for bonus added to healing.
 * @property {string} classIdentifier       Class identifier that will be used to determine applicable level.
 * @property {Set<string>} creatureSizes    Set of creature sizes that will be set on summoned creature.
 * @property {Set<string>} creatureTypes    Set of creature types that will be set on summoned creature.
 * @property {object} match
 * @property {boolean} match.attacks        Match the to hit values on summoned actor's attack to the summoner.
 * @property {boolean} match.proficiency    Match proficiency on summoned actor to the summoner.
 * @property {boolean} match.saves          Match the save DC on summoned actor's abilities to the summoner.
 * @property {""|"cr"} mode                 Method of determining what type of creature is summoned.
 * @property {SummonsProfile[]} profiles    Information on creatures that can be summoned.
 * @property {boolean} prompt               Should the player be prompted to place the summons?
 */
export class SummonsData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      bonuses: new SchemaField({
        ac: new FormulaField({
          label: "DND5A.Summoning.Bonuses.ArmorClass.Label", hint: "DND5A.Summoning.Bonuses.ArmorClass.hint"
        }),
        hd: new FormulaField({
          label: "DND5A.Summoning.Bonuses.HitDice.Label", hint: "DND5A.Summoning.Bonuses.HitDice.hint"
        }),
        hp: new FormulaField({
          label: "DND5A.Summoning.Bonuses.HitPoints.Label", hint: "DND5A.Summoning.Bonuses.HitPoints.hint"
        }),
        attackDamage: new FormulaField({
          label: "DND5A.Summoning.Bonuses.Attack.Label", hint: "DND5A.Summoning.Bonuses.Attack.Hint"
        }),
        saveDamage: new FormulaField({
          label: "DND5A.Summoning.Bonuses.Saves.Label", hint: "DND5A.Summoning.Bonuses.Saves.Hint"
        }),
        healing: new FormulaField({
          label: "DND5A.Summoning.Bonuses.Healing.Label", hint: "DND5A.Summoning.Bonuses.Healing.Hint"
        })
      }),
      classIdentifier: new IdentifierField(),
      creatureSizes: new SetField(new StringField(), {
        label: "DND5A.Summoning.CreatureSizes.Label", hint: "DND5A.Summoning.CreatureSizes.Hint"
      }),
      creatureTypes: new SetField(new StringField(), {
        label: "DND5A.Summoning.CreatureTypes.Label", hint: "DND5A.Summoning.CreatureTypes.Hint"
      }),
      match: new SchemaField({
        attacks: new BooleanField({
          label: "DND5A.Summoning.Match.Attacks.Label", hint: "DND5A.Summoning.Match.Attacks.Hint"
        }),
        proficiency: new BooleanField({
          label: "DND5A.Summoning.Match.Proficiency.Label", hint: "DND5A.Summoning.Match.Proficiency.Hint"
        }),
        saves: new BooleanField({
          label: "DND5A.Summoning.Match.Saves.Label", hint: "DND5A.Summoning.Match.Saves.Hint"
        })
      }),
      mode: new StringField({label: "DND5A.Summoning.Mode.Label", hint: "DND5A.Summoning.Mode.Hint"}),
      profiles: new ArrayField(new SchemaField({
        _id: new DocumentIdField({initial: () => foundry.utils.randomID()}),
        count: new FormulaField(),
        cr: new FormulaField({deterministic: true}),
        level: new SchemaField({
          min: new NumberField({integer: true, min: 0}),
          max: new NumberField({integer: true, min: 0})
        }),
        name: new StringField(),
        types: new SetField(new StringField()),
        uuid: new StringField()
      })),
      prompt: new BooleanField({
        initial: true, label: "DND5A.Summoning.Prompt.Label", hint: "DND5A.Summoning.Prompt.Hint"
      })
    };
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Does the user have permissions to summon?
   * @type {boolean}
   */
  static get canSummon() {
    return game.user.can("TOKEN_CREATE") && (game.user.isGM || game.settings.get("dnd5a", "allowSummoning"));
  }

  get canSummon() {
    return this.constructor.canSummon;
  }

  /* -------------------------------------------- */

  /**
   * Item to which this summoning information belongs.
   * @type {Item5e}
   */
  get item() {
    return this.parent.parent;
  }

  /* -------------------------------------------- */

  /**
   * Determine the level used to determine profile limits, based on the spell level for spells or either the
   * character or class level, depending on whether `classIdentifier` is set.
   * @type {number}
   */
  get relevantLevel() {
    const keyPath = this.item.type === "spell"
      ? "item.level"
      : this.classIdentifier
        ? `classes.${this.classIdentifier}.levels`
        : "details.level";
    return foundry.utils.getProperty(this.item.getRollData(), keyPath) ?? 0;
  }

  /* -------------------------------------------- */

  /**
   * Creatures summoned by this item.
   * @type {Actor5e[]}
   */
  get summonedCreatures() {
    if ( !this.item.actor ) return [];
    return SummonsData.summonedCreatures(this.item.actor)
      .filter(i => i?.getFlag("dnd5a", "summon.origin") === this.item.uuid);
  }

  /* -------------------------------------------- */
  /*  Summoning                                   */
  /* -------------------------------------------- */

  /**
   * Additional options that might modify summoning behavior.
   *
   * @typedef {object} SummoningOptions
   * @property {string} creatureSize  Selected creature size if multiple are available.
   * @property {string} creatureType  Selected creature type if multiple are available.
   */

  /**
   * Process for summoning actor to the scene.
   * @param {string} profileId     ID of the summoning profile to use.
   * @param {object} [options={}]  Additional summoning options.
   */
  async summon(profileId, options={}) {
    if ( !this.canSummon || !canvas.scene ) return;
    if ( (game.release.generation < 12) && (this.mode === "cr") ) return;

    const profile = this.profiles.find(p => p._id === profileId);
    if ( !profile ) {
      throw new Error(game.i18n.format("DND5A.Summoning.Warning.NoProfile", { profileId, item: this.item.name }));
    }

    /**
     * A hook event that fires before summoning is performed.
     * @function dnd5a.preSummon
     * @memberof hookEvents
     * @param {Item5e} item               The item that is performing the summoning.
     * @param {SummonsProfile} profile    Profile used for summoning.
     * @param {SummoningOptions} options  Additional summoning options.
     * @returns {boolean}                 Explicitly return `false` to prevent summoning.
     */
    if ( Hooks.call("dnd5a.preSummon", this.item, profile, options) === false ) return;

    // Fetch the actor that will be summoned
    const summonUuid = this.mode === "cr" ? await this.queryActor(profile) : profile.uuid;
    if ( !summonUuid ) return;
    const actor = await this.fetchActor(summonUuid);

    // Verify ownership of actor
    if ( !actor.isOwner ) {
      throw new Error(game.i18n.format("DND5A.Summoning.Warning.NoOwnership", { actor: actor.name }));
    }

    const tokensData = [];
    const minimized = !this.item.parent?.sheet._minimized;
    await this.item.parent?.sheet.minimize();
    try {
      // Figure out where to place the summons
      const placements = await this.getPlacement(actor.prototypeToken, profile, options);

      for ( const placement of placements ) {
        // Prepare changes to actor data, re-calculating per-token for potentially random values
        const tokenUpdateData = {
          actor,
          placement,
          ...(await this.getChanges(actor, profile, options))
        };

        /**
         * A hook event that fires before a specific token is summoned. After placement has been determined but before
         * the final token data is constructed.
         * @function dnd5a.preSummonToken
         * @memberof hookEvents
         * @param {Item5e} item               The item that is performing the summoning.
         * @param {SummonsProfile} profile    Profile used for summoning.
         * @param {TokenUpdateData} config    Configuration for creating a modified token.
         * @param {SummoningOptions} options  Additional summoning options.
         * @returns {boolean}                 Explicitly return `false` to prevent this token from being summoned.
         */
        if ( Hooks.call("dnd5a.preSummonToken", this.item, profile, tokenUpdateData, options) === false ) continue;

        // Create a token document and apply updates
        const tokenData = await this.getTokenData(tokenUpdateData);

        /**
         * A hook event that fires after token creation data is prepared, but before summoning occurs.
         * @function dnd5a.summonToken
         * @memberof hookEvents
         * @param {Item5e} item               The item that is performing the summoning.
         * @param {SummonsProfile} profile    Profile used for summoning.
         * @param {object} tokenData          Data for creating a token.
         * @param {SummoningOptions} options  Additional summoning options.
         */
        Hooks.callAll("dnd5a.summonToken", this.item, profile, tokenData, options);

        tokensData.push(tokenData);
      }
    } finally {
      if ( minimized ) this.item.parent?.sheet.maximize();
    }

    const createdTokens = await canvas.scene.createEmbeddedDocuments("Token", tokensData);

    /**
     * A hook event that fires when summoning is complete.
     * @function dnd5a.postSummon
     * @memberof hookEvents
     * @param {Item5e} item               The item that is performing the summoning.
     * @param {SummonsProfile} profile    Profile used for summoning.
     * @param {Token5e[]} tokens          Tokens that have been created.
     * @param {SummoningOptions} options  Additional summoning options.
     */
    Hooks.callAll("dnd5a.postSummon", this.item, profile, createdTokens, options);
  }

  /* -------------------------------------------- */

  /**
   * If actor to be summoned is in a compendium, create a local copy or use an already imported version if present.
   * @param {string} uuid  UUID of actor that will be summoned.
   * @returns {Actor5e}    Local copy of actor.
   */
  async fetchActor(uuid) {
    const actor = await fromUuid(uuid);
    if ( !actor ) throw new Error(game.i18n.format("DND5A.Summoning.Warning.NoActor", { uuid }));

    const actorLink = actor.prototypeToken.actorLink;
    if ( !actor.pack && (!actorLink || actor.getFlag("dnd5a", "summon.origin") === this.item.uuid )) return actor;

    // Search world actors to see if any usable summoned actor instances are present from prior summonings.
    // Linked actors must match the summoning origin (item) to be considered.
    const localActor = game.actors.find(a =>
      // Has been cloned for summoning use
      a.getFlag("dnd5a", "summonedCopy")
      // Sourced from the desired actor UUID
      && (a.getFlag("core", "sourceId") === uuid)
      // Unlinked or created from this item specifically
      && ((a.getFlag("dnd5a", "summon.origin") === this.item.uuid) || !a.prototypeToken.actorLink)
    );
    if ( localActor ) return localActor;

    // Check permissions to create actors before importing
    if ( !game.user.can("ACTOR_CREATE") ) throw new Error(game.i18n.localize("DND5A.Summoning.Warning.CreateActor"));

    // No suitable world actor was found, create a new actor for this summoning instance.
    if ( actor.pack ) {
      // Template actor resides only in compendium, import the actor into the world and set the flag.
      return game.actors.importFromCompendium(game.packs.get(actor.pack), actor.id, {
        "flags.dnd5a.summonedCopy": true
      });
    } else {
      // Template actor (linked) found in world, create a copy for this user's item.
      return actor.clone({
        "flags.dnd5a.summonedCopy": true,
        "flags.core.sourceId": actor.uuid,
        "_stats.compendiumSource": actor.uuid
      }, {save: true});
    }
  }

  /* -------------------------------------------- */

  /**
   * Request a specific actor to summon from the player.
   * @param {SummonsProfile} profile  Profile used for summoning.
   * @returns {Promise<string|null>}  UUID of the concrete actor to summon or `null` if canceled.
   */
  async queryActor(profile) {
    const locked = {
      documentClass: "Actor",
      types: new Set(["npc"]),
      additional: {
        cr: { max: simplifyBonus(profile.cr, this.item.getRollData({ deterministic: true })) }
      }
    };
    if ( profile.types.size ) locked.additional.type = Array.from(profile.types).reduce((obj, type) => {
      obj[type] = 1;
      return obj;
    }, {});
    return CompendiumBrowser.selectOne({ filters: { locked } });
  }

  /* -------------------------------------------- */

  /**
   * Prepare the updates to apply to the summoned actor and its token.
   * @param {Actor5e} actor             Actor that will be modified.
   * @param {SummonsProfile} profile    Summoning profile used to summon the actor.
   * @param {SummoningOptions} options  Additional summoning options.
   * @returns {Promise<{actorChanges: object, tokenChanges: object}>}  Changes that will be applied to the actor,
   *                                                                   its items, and its token.
   */
  async getChanges(actor, profile, options) {
    const actorUpdates = { effects: [], items: [] };
    const tokenUpdates = {};
    const rollData = { ...this.item.getRollData(), summon: actor.getRollData() };
    const prof = rollData.attributes?.prof ?? 0;

    // Add flags
    actorUpdates["flags.dnd5a.summon"] = {
      level: this.relevantLevel,
      mod: rollData.mod,
      origin: this.item.uuid,
      profile: profile._id
    };

    // Match proficiency
    if ( this.match.proficiency ) {
      const proficiencyEffect = new ActiveEffect({
        _id: staticID("dnd5aMatchProficiency"),
        changes: [{
          key: "system.attributes.prof",
          mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
          value: prof
        }],
        disabled: false,
        icon: "icons/skills/targeting/crosshair-bars-yellow.webp",
        name: game.i18n.localize("DND5A.Summoning.Match.Proficiency.Label")
      });
      actorUpdates.effects.push(proficiencyEffect.toObject());
    }

    // Add bonus to AC
    if ( this.bonuses.ac ) {
      const acBonus = new Roll(this.bonuses.ac, rollData);
      await acBonus.evaluate();
      if ( acBonus.total ) {
        if ( actor.system.attributes.ac.calc === "flat" ) {
          actorUpdates["system.attributes.ac.flat"] = (actor.system.attributes.ac.flat ?? 0) + acBonus.total;
        } else {
          actorUpdates.effects.push((new ActiveEffect({
            _id: staticID("dnd5aACBonus"),
            changes: [{
              key: "system.attributes.ac.bonus",
              mode: CONST.ACTIVE_EFFECT_MODES.ADD,
              value: acBonus.total
            }],
            disabled: false,
            icon: "icons/magic/defensive/shield-barrier-blue.webp",
            name: game.i18n.localize("DND5A.Summoning.Bonuses.ArmorClass.Label")
          })).toObject());
        }
      }
    }

    // Add bonus to HD
    if ( this.bonuses.hd && (actor.type === "npc") ) {
      const hdBonus = new Roll(this.bonuses.hd, rollData);
      await hdBonus.evaluate();
      if ( hdBonus.total ) {
        actorUpdates.effects.push((new ActiveEffect({
          _id: staticID("dnd5aHDBonus"),
          changes: [{
            key: "system.attributes.hd.max",
            mode: CONST.ACTIVE_EFFECT_MODES.ADD,
            value: hdBonus.total
          }],
          disabled: false,
          icon: "icons/sundries/gaming/dice-runed-brown.webp",
          name: game.i18n.localize("DND5A.Summoning.Bonuses.HitDice.Label")
        })).toObject());
      }
    }

    // Add bonus to HP
    if ( this.bonuses.hp ) {
      const hpBonus = new Roll(this.bonuses.hp, rollData);
      await hpBonus.evaluate();

      // If non-zero hp bonus, apply as needed for this actor.
      // Note: Only unlinked actors will have their current HP set to their new max HP
      if ( hpBonus.total ) {

        // Helper function for modifying max HP ('bonuses.overall' or 'max')
        const maxHpEffect = hpField => {
          return (new ActiveEffect({
            _id: staticID("dnd5aHPBonus"),
            changes: [{
              key: `system.attributes.hp.${hpField}`,
              mode: CONST.ACTIVE_EFFECT_MODES.ADD,
              value: hpBonus.total
            }],
            disabled: false,
            icon: "icons/magic/life/heart-glowing-red.webp",
            name: game.i18n.localize("DND5A.Summoning.Bonuses.HitPoints.Label")
          })).toObject();
        };

        if ( !foundry.utils.isEmpty(actor.classes) && !actor._source.system.attributes.hp.max ) {
          // Actor has classes without a hard-coded max -- apply bonuses to 'overall'
          actorUpdates.effects.push(maxHpEffect("bonuses.overall"));
        } else if ( actor.prototypeToken.actorLink ) {
          // Otherwise, linked actors boost HP via 'max' AE
          actorUpdates.effects.push(maxHpEffect("max"));
        } else {
          // Unlinked actors assumed to always be "fresh" copies with bonus HP added to both
          // Max HP and Current HP
          actorUpdates["system.attributes.hp.max"] = actor.system.attributes.hp.max + hpBonus.total;
          actorUpdates["system.attributes.hp.value"] = actor.system.attributes.hp.value + hpBonus.total;
        }
      }
    }

    // Change creature size
    if ( this.creatureSizes.size ) {
      const size = this.creatureSizes.has(options.creatureSize) ? options.creatureSize : this.creatureSizes.first();
      const config = CONFIG.DND5A.actorSizes[size];
      if ( config ) {
        actorUpdates["system.traits.size"] = size;
        tokenUpdates.width = config.token ?? 1;
        tokenUpdates.height = config.token ?? 1;
      }
    }

    // Change creature type
    if ( this.creatureTypes.size ) {
      const type = this.creatureTypes.has(options.creatureType) ? options.creatureType : this.creatureTypes.first();
      if ( actor.system.details?.race instanceof Item ) {
        actorUpdates.items.push({ _id: actor.system.details.race.id, "system.type.value": type });
      } else {
        actorUpdates["system.details.type.value"] = type;
      }
    }

    const attackDamageBonus = Roll.replaceFormulaData(this.bonuses.attackDamage, rollData);
    const saveDamageBonus = Roll.replaceFormulaData(this.bonuses.saveDamage, rollData);
    const healingBonus = Roll.replaceFormulaData(this.bonuses.healing, rollData);
    for ( const item of actor.items ) {
      const changes = [];

      // Match attacks
      if ( this.match.attacks && item.hasAttack ) {
        const ability = this.item.abilityMod ?? rollData.attributes?.spellcasting;
        const typeMapping = { mwak: "msak", rwak: "rsak" };
        const parts = [
          rollData.abilities?.[ability]?.mod,
          prof,
          rollData.bonuses?.[typeMapping[item.system.actionType] ?? item.system.actionType]?.attack
        ].filter(p => p);
        changes.push({
          key: "system.attack.bonus",
          mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
          value: parts.join(" + ")
        }, {
          key: "system.attack.flat",
          mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
          value: true
        });
      }

      // Match saves
      if ( this.match.saves && item.hasSave ) changes.push({
        key: "system.save.dc",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: rollData.item.save.dc ?? rollData.attributes.spelldc
      }, {
        key: "system.save.scaling",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        value: "flat"
      });

      // Damage bonus
      let damageBonus;
      if ( item.hasAttack ) damageBonus = attackDamageBonus;
      else if ( item.system.actionType === "save" ) damageBonus = saveDamageBonus;
      else if ( item.isHealing ) damageBonus = healingBonus;
      if ( damageBonus && item.hasDamage ) changes.push({
        key: "system.damage.parts",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: JSON.stringify([[`${damageBonus}`, ""]])
      });

      if ( changes.length ) {
        const effect = (new ActiveEffect({
          _id: staticID("dnd5aItemChanges"),
          changes,
          disabled: false,
          icon: "icons/skills/melee/strike-slashes-orange.webp",
          name: game.i18n.localize("DND5A.Summoning.ItemChanges.Label"),
          origin: this.item.uuid,
          flags: {
            dnd5a: { type: "enchantment" }
          }
        })).toObject();
        actorUpdates.items.push({ _id: item.id, effects: [effect] });
      }
    }

    return { actorUpdates, tokenUpdates };
  }

  /* -------------------------------------------- */

  /**
   * Determine where the summons should be placed on the scene.
   * @param {PrototypeToken} token      Token to be placed.
   * @param {SummonsProfile} profile    Profile used for summoning.
   * @param {SummoningOptions} options  Additional summoning options.
   * @returns {Promise<PlacementData[]>}
   */
  async getPlacement(token, profile, options) {
    // Ensure the token matches the final size
    if ( this.creatureSizes.size ) {
      const size = this.creatureSizes.has(options.creatureSize) ? options.creatureSize : this.creatureSizes.first();
      const config = CONFIG.DND5A.actorSizes[size];
      if ( config ) token = token.clone({ width: config.token ?? 1, height: config.token ?? 1 });
    }

    const rollData = this.item.getRollData();
    const count = new Roll(profile.count || "1", rollData);
    await count.evaluate();
    return TokenPlacement.place({ tokens: Array(count.total).fill(token) });
  }

  /* -------------------------------------------- */

  /**
   * Configuration for creating a modified token.
   *
   * @typedef {object} TokenUpdateData
   * @property {Actor5e} actor            Original actor from which the token will be created.
   * @property {PlacementData} placement  Information on the location to summon the token.
   * @property {object} tokenUpdates      Additional updates that will be applied to token data.
   * @property {object} actorUpdates      Updates that will be applied to actor delta.
   */

  /**
   * Create token data ready to be summoned.
   * @param {config} TokenUpdateData  Configuration for creating a modified token.
   * @returns {object}
   */
  async getTokenData({ actor, placement, tokenUpdates, actorUpdates }) {
    if ( actor.prototypeToken.randomImg && !game.user.can("FILES_BROWSE") ) {
      tokenUpdates.texture ??= {};
      tokenUpdates.texture.src ??= actor.img;
      ui.notifications.warn("DND5A.Summoning.Warning.Wildcard", { localize: true });
    }

    delete placement.prototypeToken;
    const tokenDocument = await actor.getTokenDocument(foundry.utils.mergeObject(placement, tokenUpdates));

    // Linked summons require more explicit updates before token creation.
    // Unlinked summons can take actor delta directly.
    if ( tokenDocument.actorLink ) {
      const { effects, items, ...rest } = actorUpdates;
      await tokenDocument.actor.update(rest);
      await tokenDocument.actor.updateEmbeddedDocuments("Item", items);

      const { newEffects, oldEffects } = effects.reduce((acc, curr) => {
        const target = tokenDocument.actor.effects.get(curr._id) ? "oldEffects" : "newEffects";
        acc[target].push(curr);
        return acc;
      }, { newEffects: [], oldEffects: [] });

      await tokenDocument.actor.updateEmbeddedDocuments("ActiveEffect", oldEffects);
      await tokenDocument.actor.createEmbeddedDocuments("ActiveEffect", newEffects, {keepId: true});
    } else {
      tokenDocument.delta.updateSource(actorUpdates);
      if ( actor.prototypeToken.appendNumber ) TokenPlacement.adjustAppendedNumber(tokenDocument, placement);
    }

    return tokenDocument.toObject();
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Determine the label for a profile in the ability use dialog.
   * @param {SummonsProfile} profile  Profile for which to generate the label.
   * @param {object} rollData         Roll data used to prepare the count.
   * @returns {string}
   */
  getProfileLabel(profile, rollData) {
    let label;
    if ( profile.name ) label = profile.name;
    else {
      switch ( this.mode ) {
        case "cr":
          const cr = simplifyBonus(profile.cr, rollData);
          label = game.i18n.format("DND5A.Summoning.Profile.ChallengeRatingLabel", { cr: formatCR(cr) });
          break;
        default:
          const doc = fromUuidSync(profile.uuid);
          if ( doc ) label = doc.name;
          break;
      }
    }
    label ??= "—";

    let count = simplifyRollFormula(Roll.replaceFormulaData(profile.count ?? "1", rollData));
    if ( Number.isNumeric(count) ) {
      count = parseInt(count);
      label = `${count} × ${label}`;
    } else if ( count ) label = `${count} × ${label}`;

    return label;
  }

  /* -------------------------------------------- */
  /*  Static Registry                             */
  /* -------------------------------------------- */

  /**
   * Registration of summoned creatures mapped to a specific summoner. The map is keyed by the UUID of
   * summoner while the set contains UUID of actors that have been summoned.
   * @type {Map<string, Set<string>>}
   */
  static #summonedCreatures = new Map();

  /* -------------------------------------------- */

  /**
   * Fetch creatures summoned by an actor.
   * @param {Actor5e} actor  Actor for which to find the summoned creatures.
   * @returns {Actor5e[]}
   */
  static summonedCreatures(actor) {
    return Array.from(SummonsData.#summonedCreatures.get(actor.uuid) ?? []).map(uuid => fromUuidSync(uuid));
  }

  /* -------------------------------------------- */

  /**
   * Add a new summoned creature to the list of summoned creatures.
   * @param {string} summoner  UUID of the actor who performed the summoning.
   * @param {string} summoned  UUID of the summoned creature to track.
   */
  static trackSummon(summoner, summoned) {
    if ( summoned.startsWith("Compendium.") ) return;
    if ( !SummonsData.#summonedCreatures.has(summoner) ) {
      SummonsData.#summonedCreatures.set(summoner, new Set());
    }
    SummonsData.#summonedCreatures.get(summoner).add(summoned);
  }

  /* -------------------------------------------- */

  /**
   * Stop tracking a summoned creature.
   * @param {string} summoner  UUID of the actor who performed the summoning.
   * @param {string} summoned  UUID of the summoned creature to stop tracking.
   */
  static untrackSummon(summoner, summoned) {
    SummonsData.#summonedCreatures.get(summoner)?.delete(summoned);
  }
}
