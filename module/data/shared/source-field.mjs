const { SchemaField, StringField } = foundry.data.fields;

/**
 * Data fields that stores information on the adventure or sourcebook where this document originated.
 *
 * @property {string} book     Book/publication where the item originated.
 * @property {string} page     Page or section where the item can be found.
 * @property {string} custom   Fully custom source label.
 * @property {string} license  Type of license that covers this item.
 */
export default class SourceField extends SchemaField {
  constructor(fields={}, options={}) {
    fields = {
      book: new StringField({label: "DND5A.SourceBook"}),
      page: new StringField({label: "DND5A.SourcePage"}),
      custom: new StringField({label: "DND5A.SourceCustom"}),
      license: new StringField({label: "DND5A.SourceLicense"}),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "DND5A.Source", ...options });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  initialize(value, model, options={}) {
    const obj = super.initialize(value, model, options);

    Object.defineProperty(obj, "label", {
      get() {
        if ( this.custom ) return this.custom;
        const page = Number.isNumeric(this.page)
          ? game.i18n.format("DND5A.SourcePageDisplay", { page: this.page }) : this.page;
        return game.i18n.format("DND5A.SourceDisplay", { book: this.book ?? "", page: page ?? "" }).trim();
      },
      enumerable: false
    });
    Object.defineProperty(obj, "toString", {
      value: () => {
        foundry.utils.logCompatibilityWarning(
          "Source has been converted to an object, the label can now be accessed using the `source#label` property.",
          { since: "DnD5e 2.4", until: "DnD5e 3.1" }
        );
        return obj.label;
      },
      enumerable: false
    });
    Object.defineProperty(obj, "directlyEditable", {
      get() {
        return (this.custom ?? "") === this.label;
      },
      enumerable: false
    });

    return obj;
  }
}
