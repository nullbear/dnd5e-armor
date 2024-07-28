import Actor5e from "../../documents/actor/actor.mjs";
import { ItemDataModel } from "../abstract.mjs";
import { AdvancementField, IdentifierField } from "../fields.mjs";
import { CreatureTypeField, MovementField, SensesField } from "../shared/_module.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

/**
 * Data definition for Race items.
 * @mixes ItemDescriptionTemplate
 *
 * @property {string} identifier       Identifier slug for this race.
 * @property {object[]} advancement    Advancement objects for this race.
 * @property {MovementField} movement
 * @property {SensesField} senses
 * @property {CreatureType} type
 */
export default class RaceData extends ItemDataModel.mixin(ItemDescriptionTemplate) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      identifier: new IdentifierField({label: "DND5A.Identifier"}),
      advancement: new foundry.data.fields.ArrayField(new AdvancementField(), {label: "DND5A.AdvancementTitle"}),
      movement: new MovementField(),
      senses: new SensesField(),
      type: new CreatureTypeField({ swarm: false }, { initial: { value: "humanoid" } })
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    singleton: true
  }, {inplace: false}));

  /* -------------------------------------------- */

  /** @override */
  static get compendiumBrowserFilters() {
    return new Map([
      ["hasDarkvision", {
        label: "DND5A.CompendiumBrowser.Filters.HasDarkvision",
        type: "boolean",
        createFilter: (filters, value, def) => {
          if ( value === 0 ) return;
          const filter = { k: "system.senses.darkvision", o: "gt", v: 0 };
          if ( value === 1 ) filters.push(filter);
          else filters.push({ o: "NOT", v: filter });
        }
      }]
    ]);
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Sheet labels for a race's movement.
   * @returns {Object<string>}
   */
  get movementLabels() {
    const units = CONFIG.DND5A.movementUnits[this.movement.units || Object.keys(CONFIG.DND5A.movementUnits)[0]];
    return Object.entries(CONFIG.DND5A.movementTypes).reduce((obj, [k, label]) => {
      const value = this.movement[k];
      if ( value ) obj[k] = `${label} ${value} ${units}`;
      return obj;
    }, {});
  }

  /* -------------------------------------------- */

  /**
   * Sheet labels for a race's senses.
   * @returns {Object<string>}
   */
  get sensesLabels() {
    const units = CONFIG.DND5A.movementUnits[this.senses.units || Object.keys(CONFIG.DND5A.movementUnits)[0]];
    return Object.entries(CONFIG.DND5A.senses).reduce((arr, [k, label]) => {
      const value = this.senses[k];
      if ( value ) arr.push(`${label} ${value} ${units}`);
      return arr;
    }, []).concat(this.senses.special.split(";").filter(l => l));
  }

  /* -------------------------------------------- */

  /**
   * Sheet label for a race's creature type.
   * @returns {Object<string>}
   */
  get typeLabel() {
    return Actor5e.formatCreatureType(this.type);
  }

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Create default advancement items when race is created.
   * @param {object} data               The initial data object provided to the document creation request.
   * @param {object} options            Additional options which modify the creation request.
   * @param {User} user                 The User requesting the document creation.
   * @returns {Promise<boolean|void>}   A return value of false indicates the creation operation should be cancelled.
   * @see {Document#_preCreate}
   * @protected
   */
  async _preCreate(data, options, user) {
    if ( data._id || foundry.utils.hasProperty(data, "system.advancement") ) return;
    const toCreate = [
      { type: "AbilityScoreImprovement" }, { type: "Size" },
      { type: "Trait", configuration: { grants: ["languages:standard:common"] } }
    ];
    this.parent.updateSource({"system.advancement": toCreate.map(c => {
      const config = CONFIG.DND5A.advancementTypes[c.type];
      const cls = config.documentClass ?? config;
      return new cls(c, { parent: this.parent }).toObject();
    })});
  }

  /* -------------------------------------------- */

  /**
   * Set the race reference in actor data.
   * @param {object} data     The initial data object provided to the document creation request
   * @param {object} options  Additional options which modify the creation request
   * @param {string} userId   The id of the User requesting the document update
   * @see {Document#_onCreate}
   * @protected
   */
  _onCreate(data, options, userId) {
    if ( (game.user.id !== userId) || !["character", "npc"].includes(this.parent.actor?.type) ) return;
    this.parent.actor.update({ "system.details.race": this.parent.id });
  }

  /* -------------------------------------------- */

  /**
   * Remove the race reference in actor data.
   * @param {object} options            Additional options which modify the deletion request
   * @param {documents.BaseUser} user   The User requesting the document deletion
   * @returns {Promise<boolean|void>}   A return value of false indicates the deletion operation should be cancelled.
   * @see {Document#_preDelete}
   * @protected
   */
  async _preDelete(options, user) {
    if ( !["character", "npc"].includes(this.parent.actor?.type) ) return;
    await this.parent.actor.update({ "system.details.race": null });
  }
}
