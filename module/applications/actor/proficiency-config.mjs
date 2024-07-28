import BaseConfigSheet from "./base-config.mjs";
import * as Trait from "../../documents/actor/trait.mjs";

/**
 * @typedef {FormApplicationOptions} ProficiencyConfigOptions
 * @property {string} key       The ID of the skill or tool being configured.
 * @property {string} property  The property on the actor being configured, either 'skills', or 'tools'.
 */

/**
 * An application responsible for configuring proficiencies and bonuses in tools and skills.
 *
 * @param {Actor5e} actor                     The Actor being configured.
 * @param {ProficiencyConfigOptions} options  Additional configuration options.
 */
export default class ProficiencyConfig extends BaseConfigSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5a"],
      template: "systems/dnd5a/templates/apps/proficiency-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /**
   * Are we configuring a tool?
   * @returns {boolean}
   */
  get isTool() {
    return this.options.property === "tools";
  }

  /* -------------------------------------------- */

  /**
   * Are we configuring a skill?
   * @returns {boolean}
   */
  get isSkill() {
    return this.options.property === "skills";
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    const label = this.isSkill ? CONFIG.DND5A.skills[this.options.key].label
      : Trait.keyLabel(this.options.key, { trait: "tool" });
    return `${game.i18n.format("DND5A.ProficiencyConfigureTitle", {label})}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get id() {
    return `ProficiencyConfig-${this.document.documentName}-${this.document.id}-${this.options.key}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options={}) {
    return {
      abilities: CONFIG.DND5A.abilities,
      proficiencyLevels: CONFIG.DND5A.proficiencyLevels,
      entry: this.document.system[this.options.property]?.[this.options.key],
      isTool: this.isTool,
      isSkill: this.isSkill,
      key: this.options.key,
      property: this.options.property,
      system: this.document.system
    };
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    if ( this.isTool ) return super._updateObject(event, formData);
    const passive = formData[`system.skills.${this.options.key}.bonuses.passive`];
    const passiveRoll = new Roll(passive);
    if ( !passiveRoll.isDeterministic ) {
      const message = game.i18n.format("DND5A.FormulaCannotContainDiceError", {
        name: game.i18n.localize("DND5A.SkillBonusPassive")
      });
      ui.notifications.error(message);
      throw new Error(message);
    }
    return super._updateObject(event, formData);
  }
}
