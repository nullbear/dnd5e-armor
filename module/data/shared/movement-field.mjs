/**
 * Field for storing movement data.
 */
export default class MovementField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    const numberConfig = { required: true, nullable: true, min: 0, step: 0.1, initial: null };
    fields = {
      burrow: new foundry.data.fields.NumberField({ ...numberConfig, label: "DND5A.MovementBurrow" }),
      climb: new foundry.data.fields.NumberField({ ...numberConfig, label: "DND5A.MovementClimb" }),
      fly: new foundry.data.fields.NumberField({ ...numberConfig, label: "DND5A.MovementFly" }),
      swim: new foundry.data.fields.NumberField({ ...numberConfig, label: "DND5A.MovementSwim" }),
      walk: new foundry.data.fields.NumberField({ ...numberConfig, label: "DND5A.MovementWalk" }),
      units: new foundry.data.fields.StringField({
        required: true, nullable: true, blank: false, initial: null, label: "DND5A.MovementUnits"
      }),
      hover: new foundry.data.fields.BooleanField({required: true, label: "DND5A.MovementHover"}),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "DND5A.Movement", ...options });
  }
}
