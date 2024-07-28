import { ItemDataModel } from "../abstract.mjs";
import { AdvancementField, IdentifierField } from "../fields.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

/**
 * Data definition for Subclass items.
 * @mixes ItemDescriptionTemplate
 *
 * @property {string} identifier       Identifier slug for this subclass.
 * @property {string} classIdentifier  Identifier slug for the class with which this subclass should be associated.
 * @property {object[]} advancement    Advancement objects for this subclass.
 * @property {object} spellcasting              Details on subclass's spellcasting ability.
 * @property {string} spellcasting.progression  Spell progression granted by class as from `DND5A.spellProgression`.
 * @property {string} spellcasting.ability      Ability score to use for spellcasting.
 */
export default class SubclassData extends ItemDataModel.mixin(ItemDescriptionTemplate) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      identifier: new IdentifierField({required: true, label: "DND5A.Identifier"}),
      classIdentifier: new IdentifierField({
        required: true, label: "DND5A.ClassIdentifier", hint: "DND5A.ClassIdentifierHint"
      }),
      advancement: new foundry.data.fields.ArrayField(new AdvancementField(), {label: "DND5A.AdvancementTitle"}),
      spellcasting: new foundry.data.fields.SchemaField({
        progression: new foundry.data.fields.StringField({
          required: true, initial: "none", blank: false, label: "DND5A.SpellProgression"
        }),
        ability: new foundry.data.fields.StringField({required: true, label: "DND5A.SpellAbility"})
      }, {label: "DND5A.Spellcasting"})
    });
  }
}
