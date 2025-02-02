const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Base application from which all system applications should be based.
 */
export default class Application5e extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["dnd5e"]
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.CONFIG = CONFIG.DND5E;
    return context;
  }
}
