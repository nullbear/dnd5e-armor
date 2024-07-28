import Proficiency from "../../documents/actor/proficiency.mjs";
import { FormulaField } from "../fields.mjs";
import CreatureTypeField from "../shared/creature-type-field.mjs";
import RollConfigField from "../shared/roll-config-field.mjs";
import SourceField from "../shared/source-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

const { BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;

/**
 * System data definition for NPCs.
 *
 * @property {object} attributes
 * @property {object} attributes.ac
 * @property {number} attributes.ac.flat         Flat value used for flat or natural armor calculation.
 * @property {string} attributes.ac.calc         Name of one of the built-in formulas to use.
 * @property {string} attributes.ac.formula      Custom formula to use.
 * @property {object} attributes.hd
 * @property {number} attributes.hd.spent        Number of hit dice spent.
 * @property {object} attributes.hp
 * @property {number} attributes.hp.value        Current hit points.
 * @property {number} attributes.hp.max          Maximum allowed HP value.
 * @property {number} attributes.hp.temp         Temporary HP applied on top of value.
 * @property {number} attributes.hp.tempmax      Temporary change to the maximum HP.
 * @property {string} attributes.hp.formula      Formula used to determine hit points.
 * @property {object} attributes.death
 * @property {number} attributes.death.success   Number of successful death saves.
 * @property {number} attributes.death.failure   Number of failed death saves.
 * @property {object} details
 * @property {TypeData} details.type             Creature type of this NPC.
 * @property {string} details.type.value         NPC's type as defined in the system configuration.
 * @property {string} details.type.subtype       NPC's subtype usually displayed in parenthesis after main type.
 * @property {string} details.type.swarm         Size of the individual creatures in a swarm, if a swarm.
 * @property {string} details.type.custom        Custom type beyond what is available in the configuration.
 * @property {string} details.environment        Common environments in which this NPC is found.
 * @property {number} details.cr                 NPC's challenge rating.
 * @property {number} details.spellLevel         Spellcasting level of this NPC.
 * @property {SourceField} details.source        Adventure or sourcebook where this NPC originated.
 * @property {object} resources
 * @property {object} resources.legact           NPC's legendary actions.
 * @property {number} resources.legact.value     Currently available legendary actions.
 * @property {number} resources.legact.max       Maximum number of legendary actions.
 * @property {object} resources.legres           NPC's legendary resistances.
 * @property {number} resources.legres.value     Currently available legendary resistances.
 * @property {number} resources.legres.max       Maximum number of legendary resistances.
 * @property {object} resources.lair             NPC's lair actions.
 * @property {boolean} resources.lair.value      Does this NPC use lair actions.
 * @property {number} resources.lair.initiative  Initiative count when lair actions are triggered.
 */
export default class NPCData extends CreatureTemplate {

  /** @inheritdoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    supportsAdvancement: true
  }, {inplace: false}));

  /* -------------------------------------------- */

  /** @inheritdoc */
  static _systemType = "npc";

  /* -------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      attributes: new SchemaField({
        ...AttributesFields.common,
        ...AttributesFields.creature,
        ac: new SchemaField({
          flat: new NumberField({integer: true, min: 0, label: "DND5A.ArmorClassFlat"}),
          calc: new StringField({initial: "default", label: "DND5A.ArmorClassCalculation"}),
          formula: new FormulaField({deterministic: true, label: "DND5A.ArmorClassFormula"})
        }, {label: "DND5A.ArmorClass"}),
        hd: new SchemaField({
          spent: new NumberField({integer: true, min: 0, initial: 0})
        }, {label: "DND5A.HitDice"}),
        hp: new SchemaField({
          value: new NumberField({
            nullable: false, integer: true, min: 0, initial: 10, label: "DND5A.HitPointsCurrent"
          }),
          max: new NumberField({
            nullable: false, integer: true, min: 0, initial: 10, label: "DND5A.HitPointsMax"
          }),
          temp: new NumberField({integer: true, initial: 0, min: 0, label: "DND5A.HitPointsTemp"}),
          tempmax: new NumberField({integer: true, initial: 0, label: "DND5A.HitPointsTempMax"}),
          formula: new FormulaField({required: true, label: "DND5A.HPFormula"})
        }, {label: "DND5A.HitPoints"}),
        death: new RollConfigField({
          success: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.DeathSaveSuccesses"
          }),
          failure: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.DeathSaveFailures"
          })
        }, {label: "DND5A.DeathSave"})
      }, {label: "DND5A.Attributes"}),
      details: new SchemaField({
        ...DetailsFields.common,
        ...DetailsFields.creature,
        type: new CreatureTypeField(),
        environment: new StringField({required: true, label: "DND5A.Environment"}),
        cr: new NumberField({
          required: true, nullable: false, min: 0, initial: 1, label: "DND5A.ChallengeRating"
        }),
        spellLevel: new NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.SpellcasterLevel"
        }),
        source: new SourceField()
      }, {label: "DND5A.Details"}),
      resources: new SchemaField({
        legact: new SchemaField({
          value: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.LegActRemaining"
          }),
          max: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.LegActMax"
          })
        }, {label: "DND5A.LegAct"}),
        legres: new SchemaField({
          value: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.LegResRemaining"
          }),
          max: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "DND5A.LegResMax"
          })
        }, {label: "DND5A.LegRes"}),
        lair: new SchemaField({
          value: new BooleanField({required: true, label: "DND5A.LairAct"}),
          initiative: new NumberField({
            required: true, integer: true, label: "DND5A.LairActionInitiative"
          })
        }, {label: "DND5A.LairActionLabel"})
      }, {label: "DND5A.Resources"}),
      traits: new SchemaField({
        ...TraitsFields.common,
        ...TraitsFields.creature
      }, {label: "DND5A.Traits"})
    });
  }

  /* -------------------------------------------- */

  /** @override */
  static get compendiumBrowserFilters() {
    return new Map([
      ["size", {
        label: "DND5A.Size",
        type: "set",
        config: {
          choices: CONFIG.DND5A.actorSizes,
          keyPath: "system.traits.size"
        }
      }],
      ["type", {
        label: "DND5A.CreatureType",
        type: "set",
        config: {
          choices: CONFIG.DND5A.creatureTypes,
          keyPath: "system.details.type.value"
        }
      }],
      ["cr", {
        label: "DND5A.ChallengeRating",
        type: "range",
        config: {
          keyPath: "system.details.cr",
          min: 0,
          max: 30
        }
      }],
      ["movement", {
        label: "DND5A.Movement",
        type: "set",
        config: {
          choices: CONFIG.DND5A.movementTypes
        },
        createFilter: (filters, value, def) => {
          for ( const [k, v] of Object.entries(value ?? {}) ) {
            if ( v === 1 ) filters.push({ k: `system.attributes.movement.${k}`, o: "gt", v: 0 });
            if ( v === -1 ) filters.push({ k: `system.attributes.movement.${k}`, v: 0 });
          }
        }
      }]
    ]);
  }

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static _migrateData(source) {
    super._migrateData(source);
    NPCData.#migrateSource(source);
    NPCData.#migrateTypeData(source);
    AttributesFields._migrateInitiative(source.attributes);
  }

  /* -------------------------------------------- */

  /**
   * Convert source string into custom object.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSource(source) {
    if ( source.details?.source && (foundry.utils.getType(source.details.source) !== "Object") ) {
      source.details.source = { custom: source.details.source };
    }
  }

  /* -------------------------------------------- */

  /**
   * Migrate the actor type string to type object.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateTypeData(source) {
    const original = source.type;
    if ( typeof original !== "string" ) return;

    source.type = {
      value: "",
      subtype: "",
      swarm: "",
      custom: ""
    };

    // Match the existing string
    const pattern = /^(?:swarm of (?<size>[\w-]+) )?(?<type>[^(]+?)(?:\((?<subtype>[^)]+)\))?$/i;
    const match = original.trim().match(pattern);
    if ( match ) {

      // Match a known creature type
      const typeLc = match.groups.type.trim().toLowerCase();
      const typeMatch = Object.entries(CONFIG.DND5A.creatureTypes).find(([k, v]) => {
        return (typeLc === k)
          || (typeLc === game.i18n.localize(v.label).toLowerCase())
          || (typeLc === game.i18n.localize(`${v.label}Pl`).toLowerCase());
      });
      if ( typeMatch ) source.type.value = typeMatch[0];
      else {
        source.type.value = "custom";
        source.type.custom = match.groups.type.trim().titleCase();
      }
      source.type.subtype = match.groups.subtype?.trim().titleCase() ?? "";

      // Match a swarm
      if ( match.groups.size ) {
        const sizeLc = match.groups.size ? match.groups.size.trim().toLowerCase() : "tiny";
        const sizeMatch = Object.entries(CONFIG.DND5A.actorSizes).find(([k, v]) => {
          return (sizeLc === k) || (sizeLc === game.i18n.localize(v.label).toLowerCase());
        });
        source.type.swarm = sizeMatch ? sizeMatch[0] : "tiny";
      }
      else source.type.swarm = "";
    }

    // No match found
    else {
      source.type.value = "custom";
      source.type.custom = original;
    }
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritdoc */
  prepareBaseData() {
    this.details.level = 0;
    this.attributes.attunement.value = 0;

    // Determine hit dice denomination & max from hit points formula
    const [, max, denomination] = this.attributes.hp.formula?.match(/(\d*)d(\d+)/i) ?? [];
    this.attributes.hd.max = Number(max ?? 0);
    this.attributes.hd.denomination = Number(denomination ?? CONFIG.DND5A.actorSizes[this.traits.size]?.hitDie ?? 4);

    for ( const item of this.parent.items ) {
      // Class levels & hit dice
      if ( item.type === "class" ) {
        const classLevels = parseInt(item.system.levels) ?? 1;
        this.details.level += classLevels;
        this.attributes.hd.max += classLevels;
      }

      // Attuned items
      else if ( item.system.attuned ) this.attributes.attunement.value += 1;
    }

    // Kill Experience
    this.details.xp ??= {};
    this.details.xp.value = this.parent.getCRExp(this.details.cr);

    // Proficiency
    this.attributes.prof = Proficiency.calculateMod(Math.max(this.details.cr, this.details.level, 1));

    // Spellcaster Level
    if ( this.attributes.spellcasting && !Number.isNumeric(this.details.spellLevel) ) {
      this.details.spellLevel = Math.max(this.details.cr, 1);
    }

    AttributesFields.prepareBaseArmorClass.call(this);
    AttributesFields.prepareBaseEncumbrance.call(this);
  }

  /* -------------------------------------------- */

  /**
   * Prepare movement & senses values derived from race item.
   */
  prepareEmbeddedData() {
    if ( this.details.race instanceof Item ) {
      AttributesFields.prepareRace.call(this, this.details.race, { force: true });
      this.details.type = this.details.race.system.type;
    }
    for ( const key of Object.keys(CONFIG.DND5A.movementTypes) ) this.attributes.movement[key] ??= 0;
    for ( const key of Object.keys(CONFIG.DND5A.senses) ) this.attributes.senses[key] ??= 0;
    this.attributes.movement.units ??= Object.keys(CONFIG.DND5A.movementUnits)[0];
    this.attributes.senses.units ??= Object.keys(CONFIG.DND5A.movementUnits)[0];
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  prepareDerivedData() {
    const rollData = this.parent.getRollData({ deterministic: true });
    const { originalSaves } = this.parent.getOriginalStats();

    this.prepareAbilities({ rollData, originalSaves });
    AttributesFields.prepareEncumbrance.call(this, rollData);
    AttributesFields.prepareExhaustionLevel.call(this);
    AttributesFields.prepareMovement.call(this);
    AttributesFields.prepareConcentration.call(this, rollData);
    TraitsFields.prepareResistImmune.call(this);

    // Hit Dice
    const { hd } = this.attributes;
    hd.value = Math.max(0, hd.max - hd.spent);
    hd.pct = Math.clamp(hd.max ? (hd.value / hd.max) * 100 : 0, 0, 100);

    // Hit Points
    const hpOptions = {
      advancement: Object.values(this.parent.classes).map(c => c.advancement.byType.HitPoints?.[0]).filter(a => a),
      mod: this.abilities[CONFIG.DND5A.defaultAbilities.hitPoints ?? "con"]?.mod ?? 0
    };
    AttributesFields.prepareHitPoints.call(this, this.attributes.hp, hpOptions);
  }
}
