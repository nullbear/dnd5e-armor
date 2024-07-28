import BaseConfigSheet from "./base-config.mjs";

/**
 * A simple form to set actor movement speeds.
 */
export default class ActorMovementConfig extends BaseConfigSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5a"],
      template: "systems/dnd5a/templates/apps/movement-config.hbs",
      width: 300,
      height: "auto",
      keyPath: "system.attributes.movement"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `${game.i18n.localize("DND5A.MovementConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options={}) {
    const source = this.document.toObject();
    const movement = foundry.utils.getProperty(source, this.options.keyPath) ?? {};
    const raceData = this.document.system.details?.race?.system?.movement ?? {};

    // Allowed speeds
    const speeds = source.type === "group" ? {
      land: "DND5A.MovementLand",
      water: "DND5A.MovementWater",
      air: "DND5A.MovementAir"
    } : {
      walk: "DND5A.MovementWalk",
      burrow: "DND5A.MovementBurrow",
      climb: "DND5A.MovementClimb",
      fly: "DND5A.MovementFly",
      swim: "DND5A.MovementSwim"
    };

    return {
      movement,
      movements: Object.entries(speeds).reduce((obj, [k, label]) => {
        obj[k] = { label, value: movement[k], placeholder: raceData[k] ?? 0 };
        return obj;
      }, {}),
      selectUnits: Object.hasOwn(movement, "units"),
      canHover: Object.hasOwn(movement, "hover"),
      units: CONFIG.DND5A.movementUnits,
      unitsPlaceholder: game.i18n.format("DND5A.AutomaticValue", {
        value: CONFIG.DND5A.movementUnits[raceData.units ?? Object.keys(CONFIG.DND5A.movementUnits)[0]]?.toLowerCase()
      }),
      keyPath: this.options.keyPath
    };
  }
}
