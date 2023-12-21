const { HTMLField, StringField } = foundry.data.fields;

/**
 * Data definition for Rule journal entry pages.
 *
 * @property {string} tooltip  Content to display in tooltip in place of page's text content.
 * @property {string} type     Type of rule represented. Should match an entry defined in `CONFIG.DND5E.ruleTypes`.
 */
export default class RuleJournalPageData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      tooltip: new HTMLField({label: "DND5E.Rule.Tooltip"}),
      type: new StringField({blank: false, initial: "rule", label: "DND5E.Rule.Type"})
    };
  }
}
