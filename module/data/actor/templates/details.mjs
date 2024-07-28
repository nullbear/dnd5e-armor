import { LocalDocumentField } from "../../fields.mjs";
const { HTMLField, SchemaField, StringField } = foundry.data.fields;

/**
 * Shared contents of the details schema between various actor types.
 */
export default class DetailsField {
  /**
   * Fields shared between characters, NPCs, and vehicles.
   *
   * @type {object}
   * @property {object} biography         Actor's biography data.
   * @property {string} biography.value   Full HTML biography information.
   * @property {string} biography.public  Biography that will be displayed to players with observer privileges.
   */
  static get common() {
    return {
      biography: new SchemaField({
        value: new HTMLField({label: "DND5A.Biography"}),
        public: new HTMLField({label: "DND5A.BiographyPublic"})
      }, {label: "DND5A.Biography"})
    };
  }

  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   *
   * @type {object}
   * @property {string} alignment    Creature's alignment.
   * @property {Item5e|string} race  Creature's race item or name.
   */
  static get creature() {
    return {
      alignment: new StringField({required: true, label: "DND5A.Alignment"}),
      ideal: new StringField({required: true, label: "DND5A.Ideals"}),
      bond: new StringField({required: true, label: "DND5A.Bonds"}),
      flaw: new StringField({required: true, label: "DND5A.Flaws"}),
      race: new LocalDocumentField(foundry.documents.BaseItem, {
        required: true, fallback: true, label: "DND5A.Race"
      })
    };
  }
}
