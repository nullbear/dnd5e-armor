const { StringField, NumberField, SchemaField } = foundry.data.fields;

/**
 * Field for storing data for a specific type of roll.
 */
export default class RollConfigField extends foundry.data.fields.SchemaField {
  constructor({roll={}, ability="", ...fields}={}, options={}) {
    const opts = { initial: null, nullable: true, min: 1, max: 20, integer: true };
    fields = {
      ability: new StringField({required: true, initial: ability, label: "DND5A.AbilityModifier"}),
      roll: new SchemaField({
        min: new NumberField({...opts, label: "DND5A.Minimum"}),
        max: new NumberField({...opts, label: "DND5A.Maximum"}),
        mode: new NumberField({choices: [-1, 0, 1], initial: 0, label: "DND5A.AdvantageMode"}),
        ...roll
      }),
      ...fields
    };
    super(fields, options);
  }
}
