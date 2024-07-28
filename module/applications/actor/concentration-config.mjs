import BaseConfigSheet from "./base-config.mjs";

/**
 * A sub-application of the ActorSheet used to configure concentration saving throws.
 * @extends {BaseConfigSheet}
 */
export default class ActorConcentrationConfig extends BaseConfigSheet {
  /** @inheritDoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5a"],
      template: "systems/dnd5a/templates/apps/concentration-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.format("DND5A.AbilityConfigure", {
      ability: game.i18n.localize("DND5A.Concentration") })
    }: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const src = this.document.toObject();
    const { ability, bonuses, limit, roll } = src.system.attributes.concentration;
    return {
      ability, limit,
      abilities: CONFIG.DND5A.abilities,
      bonus: bonuses.save,
      mode: roll.mode,
      modes: {
        "-1": "DND5A.Disadvantage",
        0: "DND5A.Normal",
        1: "DND5A.Advantage"
      },
      bonusGlobalSave: src.system.bonuses?.abilities?.save
    };
  }
}
