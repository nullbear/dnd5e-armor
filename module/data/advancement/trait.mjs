/**
 * Configuration for a specific trait choice.
 *
 * @typedef {object} TraitChoice
 * @property {number} count     Number of traits that can be selected.
 * @property {string[]} [pool]  List of trait or category keys that can be chosen. If no choices are provided,
 *                              any trait of the specified type can be selected.
 */

/**
 * Configuration data for the TraitAdvancement.
 *
 * @property {string} mode                Method by which this advancement modifies the actor's traits.
 * @property {boolean} allowReplacements  Whether all potential choices should be presented to the user if there
 *                                        are no more choices available in a more limited set.
 * @property {string[]} grants            Keys for traits granted automatically.
 * @property {TraitChoice[]} choices      Choices presented to the user.
 */
export class TraitConfigurationData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      mode: new foundry.data.fields.StringField({initial: "default", label: "DND5A.AdvancementTraitMode"}),
      allowReplacements: new foundry.data.fields.BooleanField({
        required: true, label: "DND5A.AdvancementTraitAllowReplacements",
        hint: "DND5A.AdvancementTraitAllowReplacementsHint"
      }),
      grants: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), {
        required: true, label: "DND5A.AdvancementTraitGrants"
      }),
      choices: new foundry.data.fields.ArrayField(new foundry.data.fields.SchemaField({
        count: new foundry.data.fields.NumberField({
          required: true, positive: true, integer: true, initial: 1, label: "DND5A.AdvancementTraitCount"
        }),
        pool: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), {
          required: false, label: "DOCUMENT.Items"
        })
      }), {label: "DND5A.AdvancementTraitChoices"})
    };
  }

  /* -------------------------------------------- */

  get hint() {
    foundry.utils.logCompatibilityWarning(
      "Advancement hints are now part of the base data model.",
      { since: "DnD5e 3.3", until: "DnD5e 4.1" }
    );
    return this.parent.hint ?? "";
  }
}

/**
 * Value data for the TraitAdvancement.
 *
 * @property {Set<string>} chosen  Trait keys that have been chosen.
 */
export class TraitValueData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      chosen: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), { required: false })
    };
  }
}
