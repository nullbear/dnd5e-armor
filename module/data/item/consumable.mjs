import { filteredKeys } from "../../utils.mjs";
import { ItemDataModel } from "../abstract.mjs";
import ActionTemplate from "./templates/action.mjs";
import ActivatedEffectTemplate from "./templates/activated-effect.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

const { BooleanField, NumberField, SetField, StringField } = foundry.data.fields;

/**
 * Data definition for Consumable items.
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes ActivatedEffectTemplate
 * @mixes ActionTemplate
 *
 * @property {number} magicalBonus       Magical bonus added to attack & damage rolls by ammunition.
 * @property {Set<string>} properties    Ammunition properties.
 * @property {object} uses
 * @property {boolean} uses.autoDestroy  Should this item be destroyed when it runs out of uses.
 */
export default class ConsumableData extends ItemDataModel.mixin(
  ItemDescriptionTemplate, IdentifiableTemplate, ItemTypeTemplate, PhysicalItemTemplate, EquippableItemTemplate,
  ActivatedEffectTemplate, ActionTemplate
) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      type: new ItemTypeField({value: "potion", baseItem: false}, {label: "DND5A.ItemConsumableType"}),
      magicalBonus: new NumberField({min: 0, integer: true, label: "DND5A.MagicalBonus"}),
      properties: new SetField(new StringField(), { label: "DND5A.ItemAmmoProperties" }),
      uses: new ActivatedEffectTemplate.ItemUsesField({
        autoDestroy: new BooleanField({required: true, label: "DND5A.ItemDestroyEmpty"})
      }, {label: "DND5A.LimitedUses"})
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    enchantable: true,
    inventoryItem: true,
    inventoryOrder: 300
  }, {inplace: false}));

  /* -------------------------------------------- */

  /** @override */
  static get compendiumBrowserFilters() {
    return new Map([
      ["type", {
        label: "DND5A.ItemConsumableType",
        type: "set",
        config: {
          choices: CONFIG.DND5A.consumableTypes,
          keyPath: "system.type.value"
        }
      }],
      ["attunement", this.compendiumBrowserAttunementFilter],
      ...this.compendiumBrowserPhysicalItemFilters,
      ["properties", this.compendiumBrowserPropertiesFilter("consumable")]
    ]);
  }

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static _migrateData(source) {
    super._migrateData(source);
    ConsumableData.#migratePropertiesData(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the properties object into a set.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migratePropertiesData(source) {
    if ( foundry.utils.getType(source.properties) !== "Object" ) return;
    source.properties = filteredKeys(source.properties);
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    if ( !this.type.value ) return;
    const config = CONFIG.DND5A.consumableTypes[this.type.value];
    if ( config ) {
      this.type.label = config.subtypes?.[this.type.subtype] ?? config.label;
    } else {
      this.type.label = game.i18n.localize(CONFIG.Item.typeLabels.consumable);
    }
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData() {
    this.prepareFinalActivatedEffectData();
    this.prepareFinalEquippableData();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getFavoriteData() {
    return foundry.utils.mergeObject(await super.getFavoriteData(), {
      subtitle: [this.type.label, this.parent.labels.activation],
      uses: this.hasLimitedUses ? this.getUsesData() : null,
      quantity: this.quantity
    });
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [
      this.type.label,
      this.hasLimitedUses ? `${this.uses.value}/${this.uses.max} ${game.i18n.localize("DND5A.Charges")}` : null,
      this.priceLabel
    ];
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get _typeAbilityMod() {
    if ( this.type.value !== "scroll" ) return null;
    return this.parent?.actor?.system.attributes.spellcasting || "int";
  }

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   * @returns {number}
   */
  get proficiencyMultiplier() {
    const isProficient = this.parent?.actor?.getFlag("dnd5a", "tavernBrawlerFeat");
    return isProficient ? 1 : 0;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get validProperties() {
    const valid = super.validProperties;
    if ( this.type.value === "ammo" ) Object.entries(CONFIG.DND5A.itemProperties).forEach(([k, v]) => {
      if ( v.isPhysical ) valid.add(k);
    });
    else if ( this.type.value === "scroll" ) CONFIG.DND5A.validProperties.spell
      .filter(p => p !== "material").forEach(p => valid.add(p));
    return valid;
  }
}
