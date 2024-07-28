import AdoptedStyleSheetMixin from "./adopted-stylesheet-mixin.mjs";
import CheckboxElement from "./checkbox.mjs";
import DamageApplicationElement from "./damage-application.mjs";
import EffectsElement from "./effects.mjs";
import EnchantmentApplicationElement from "./enchantment-application.mjs";
import FiligreeBoxElement from "./filigree-box.mjs";
import FilterStateElement from "./filter-state.mjs";
import IconElement from "./icon.mjs";
import InventoryElement from "./inventory.mjs";
import ItemListControlsElement from "./item-list-controls.mjs";
import ProficiencyCycleElement from "./proficiency-cycle.mjs";
import SlideToggleElement from "./slide-toggle.mjs";

window.customElements.define("damage-application", DamageApplicationElement);
window.customElements.define("dnd5a-checkbox", CheckboxElement);
window.customElements.define("dnd5a-effects", EffectsElement);
window.customElements.define("dnd5a-icon", IconElement);
window.customElements.define("dnd5a-inventory", InventoryElement);
window.customElements.define("enchantment-application", EnchantmentApplicationElement);
window.customElements.define("filigree-box", FiligreeBoxElement);
window.customElements.define("filter-state", FilterStateElement);
window.customElements.define("item-list-controls", ItemListControlsElement);
window.customElements.define("proficiency-cycle", ProficiencyCycleElement);
window.customElements.define("slide-toggle", SlideToggleElement);

export {
  AdoptedStyleSheetMixin, CheckboxElement, DamageApplicationElement, EffectsElement, EnchantmentApplicationElement,
  FiligreeBoxElement, FilterStateElement, IconElement, InventoryElement, ItemListControlsElement,
  ProficiencyCycleElement, SlideToggleElement
};
