/**
 * Data definition for Map Location journal entry pages.
 *
 * @property {string} code  Code for the location marker on the map.
 */
export default class MapLocationJournalPageData extends foundry.abstract.DataModel {

  /** @inheritDoc */
  static defineSchema() {
    return {
      code: new foundry.data.fields.StringField()
    };
  }

  /* -------------------------------------------- */

  /**
   * Adjust the number of this entry in the table of contents.
   * @param {number} number  Current position number.
   * @returns {{ number: string, adjustment: number }|void}
   */
  adjustTOCNumbering(number) {
    if ( !this.code ) return;
    return { number: this.code, adjustment: -1 };
  }

  /* -------------------------------------------- */

  /**
   * Create a control icon for rendering this page on a scene.
   * @param {object} options  Options passed through to ControlIcon construction.
   * @returns {PIXI.Container|void}
   */
  getControlIcon(options) {
    if ( !this.code ) return;
    const { icon: IconClass, ...style } = foundry.utils.mergeObject(
      CONFIG.DND5A.mapLocationMarker.default,
      CONFIG.DND5A.mapLocationMarker[this.parent.getFlag("dnd5a", "mapMarkerStyle")] ?? {},
      {inplace: false}
    );
    return new IconClass({code: this.code, ...options, ...style});
  }
}
