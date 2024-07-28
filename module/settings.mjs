import { ModuleArtConfig } from "./module-art.mjs";

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  // Internal System Migration Version
  game.settings.register("dnd5a", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Challenge visibility
  game.settings.register("dnd5a", "challengeVisibility", {
    name: "SETTINGS.5eChallengeVisibility.Name",
    hint: "SETTINGS.5eChallengeVisibility.Hint",
    scope: "world",
    config: true,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.5eChallengeVisibility.All",
      player: "SETTINGS.5eChallengeVisibility.Player",
      none: "SETTINGS.5eChallengeVisibility.None"
    }
  });

  game.settings.register("dnd5a", "attackRollVisibility", {
    name: "SETTINGS.5eAttackRollVisibility.Name",
    hint: "SETTINGS.5eAttackRollVisibility.Hint",
    scope: "world",
    config: true,
    default: "none",
    type: String,
    choices: {
      all: "SETTINGS.5eAttackRollVisibility.All",
      hideAC: "SETTINGS.5eAttackRollVisibility.HideAC",
      none: "SETTINGS.5eAttackRollVisibility.None"
    }
  });

  // Encumbrance tracking
  game.settings.register("dnd5a", "encumbrance", {
    name: "SETTINGS.5eEncumbrance.Name",
    hint: "SETTINGS.5eEncumbrance.Hint",
    scope: "world",
    config: true,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.5eEncumbrance.None",
      normal: "SETTINGS.5eEncumbrance.Normal",
      variant: "SETTINGS.5eEncumbrance.Variant"
    }
  });

  // Rest Recovery Rules
  game.settings.register("dnd5a", "restVariant", {
    name: "SETTINGS.5eRestN",
    hint: "SETTINGS.5eRestL",
    scope: "world",
    config: true,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.5eRestPHB",
      gritty: "SETTINGS.5eRestGritty",
      epic: "SETTINGS.5eRestEpic"
    }
  });

  // Diagonal Movement Rule
  if ( game.release.generation < 12 ) {
    game.settings.register("dnd5a", "diagonalMovement", {
      name: "SETTINGS.5eDiagN",
      hint: "SETTINGS.5eDiagL",
      scope: "world",
      config: true,
      default: "555",
      type: String,
      choices: {
        555: "SETTINGS.5eDiagPHB",
        5105: "SETTINGS.5eDiagDMG",
        EUCL: "SETTINGS.5eDiagEuclidean"
      },
      onChange: rule => canvas.grid.diagonalRule = rule
    });
  }

  // Allow rotating square templates
  game.settings.register("dnd5a", "gridAlignedSquareTemplates", {
    name: "SETTINGS.5eGridAlignedSquareTemplatesN",
    hint: "SETTINGS.5eGridAlignedSquareTemplatesL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Proficiency modifier type
  game.settings.register("dnd5a", "proficiencyModifier", {
    name: "SETTINGS.5eProfN",
    hint: "SETTINGS.5eProfL",
    scope: "world",
    config: true,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.5eProfBonus",
      dice: "SETTINGS.5eProfDice"
    }
  });

  // Allow feats during Ability Score Improvements
  game.settings.register("dnd5a", "allowFeats", {
    name: "SETTINGS.5eFeatsN",
    hint: "SETTINGS.5eFeatsL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Use Honor ability score
  game.settings.register("dnd5a", "honorScore", {
    name: "SETTINGS.5eHonorN",
    hint: "SETTINGS.5eHonorL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Use Sanity ability score
  game.settings.register("dnd5a", "sanityScore", {
    name: "SETTINGS.5eSanityN",
    hint: "SETTINGS.5eSanityL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Apply Dexterity as Initiative Tiebreaker
  game.settings.register("dnd5a", "initiativeDexTiebreaker", {
    name: "SETTINGS.5eInitTBN",
    hint: "SETTINGS.5eInitTBL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Record Currency Weight
  game.settings.register("dnd5a", "currencyWeight", {
    name: "SETTINGS.5eCurWtN",
    hint: "SETTINGS.5eCurWtL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Disable Experience Tracking
  game.settings.register("dnd5a", "disableExperienceTracking", {
    name: "SETTINGS.5eNoExpN",
    hint: "SETTINGS.5eNoExpL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Advancements
  game.settings.register("dnd5a", "disableAdvancements", {
    name: "SETTINGS.5eNoAdvancementsN",
    hint: "SETTINGS.5eNoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Concentration Tracking
  game.settings.register("dnd5a", "disableConcentration", {
    name: "SETTINGS.5eNoConcentrationN",
    hint: "SETTINGS.5eNoConcentrationL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("dnd5a", "autoCollapseItemCards", {
    name: "SETTINGS.5eAutoCollapseCardN",
    hint: "SETTINGS.5eAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Collapse Chat Card Trays
  game.settings.register("dnd5a", "autoCollapseChatTrays", {
    name: "SETTINGS.DND5A.COLLAPSETRAYS.Name",
    hint: "SETTINGS.DND5A.COLLAPSETRAYS.Hint",
    scope: "client",
    config: true,
    default: "older",
    type: String,
    choices: {
      never: "SETTINGS.DND5A.COLLAPSETRAYS.Never",
      older: "SETTINGS.DND5A.COLLAPSETRAYS.Older",
      always: "SETTINGS.DND5A.COLLAPSETRAYS.Always"
    }
  });

  // Allow Polymorphing
  game.settings.register("dnd5a", "allowPolymorphing", {
    name: "SETTINGS.5eAllowPolymorphingN",
    hint: "SETTINGS.5eAllowPolymorphingL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Polymorph Settings
  game.settings.register("dnd5a", "polymorphSettings", {
    scope: "client",
    default: {
      keepPhysical: false,
      keepMental: false,
      keepSaves: false,
      keepSkills: false,
      mergeSaves: false,
      mergeSkills: false,
      keepClass: false,
      keepFeats: false,
      keepSpells: false,
      keepItems: false,
      keepBio: false,
      keepVision: true,
      keepSelf: false,
      keepAE: false,
      keepOriginAE: true,
      keepOtherOriginAE: true,
      keepFeatAE: true,
      keepSpellAE: true,
      keepEquipmentAE: true,
      keepClassAE: true,
      keepBackgroundAE: true,
      transformTokens: true
    }
  });

  // Allow Summoning
  game.settings.register("dnd5a", "allowSummoning", {
    name: "SETTINGS.DND5A.ALLOWSUMMONING.Name",
    hint: "SETTINGS.DND5A.ALLOWSUMMONING.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Metric Unit Weights
  game.settings.register("dnd5a", "metricWeightUnits", {
    name: "SETTINGS.5eMetricN",
    hint: "SETTINGS.5eMetricL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Modifiers
  game.settings.register("dnd5a", "criticalDamageModifiers", {
    name: "SETTINGS.5eCriticalModifiersN",
    hint: "SETTINGS.5eCriticalModifiersL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Maximize
  game.settings.register("dnd5a", "criticalDamageMaxDice", {
    name: "SETTINGS.5eCriticalMaxDiceN",
    hint: "SETTINGS.5eCriticalMaxDiceL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Strict validation
  game.settings.register("dnd5a", "strictValidation", {
    scope: "world",
    config: false,
    type: Boolean,
    default: true
  });

  // Dynamic art.
  game.settings.registerMenu("dnd5a", "moduleArtConfiguration", {
    name: "DND5A.ModuleArtConfigN",
    label: "DND5A.ModuleArtConfigL",
    hint: "DND5A.ModuleArtConfigH",
    icon: "fa-solid fa-palette",
    type: ModuleArtConfig,
    restricted: true
  });

  game.settings.register("dnd5a", "moduleArtConfiguration", {
    name: "Module Art Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {
      dnd5a: {
        portraits: true,
        tokens: true
      }
    }
  });

  // Primary Group
  game.settings.register("dnd5a", "primaryParty", {
    name: "Primary Party",
    scope: "world",
    config: false,
    default: null,
    type: PrimaryPartyData,
    onChange: s => ui.actors.render()
  });

  // Control hints
  game.settings.register("dnd5a", "controlHints", {
    name: "DND5A.Controls.Name",
    hint: "DND5A.Controls.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });
}

/**
 * Data model for tracking information on the primary party.
 *
 * @property {Actor5e} actor  Group actor representing the primary party.
 */
class PrimaryPartyData extends foundry.abstract.DataModel {
  static defineSchema() {
    return { actor: new foundry.data.fields.ForeignDocumentField(foundry.documents.BaseActor) };
  }
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings() {
  game.settings.register("dnd5a", "theme", {
    name: "SETTINGS.DND5A.THEME.Name",
    hint: "SETTINGS.DND5A.THEME.Hint",
    scope: "client",
    config: game.release.generation < 12,
    default: "",
    type: String,
    choices: {
      "": "SHEETS.DND5A.THEME.Automatic",
      ...CONFIG.DND5A.themes
    },
    onChange: s => setTheme(document.body, s)
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5a", "theme"));
  });
  matchMedia("(prefers-contrast: more)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5a", "theme"));
  });

  // Hook into core color scheme setting.
  if ( game.release.generation > 11 ) {
    const setting = game.settings.settings.get("core.colorScheme");
    const { onChange } = setting ?? {};
    if ( onChange ) setting.onChange = s => {
      onChange();
      setTheme(document.body, s);
    };
    setTheme(document.body, game.settings.get("core", "colorScheme"));
  }
  else setTheme(document.body, game.settings.get("dnd5a", "theme"));
}

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param {HTMLElement} element  Body or sheet element on which to set the theme data.
 * @param {string} [theme=""]    Theme key to set.
 * @param {string[]} [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element, theme="", flags=new Set()) {
  element.className = element.className.replace(/\bdnd5a-(theme|flag)-[\w-]+\b/g, "");

  // Primary Theme
  if ( !theme && (element === document.body) ) {
    if ( matchMedia("(prefers-color-scheme: dark)").matches ) theme = "dark";
    if ( matchMedia("(prefers-color-scheme: light)").matches ) theme = "light";
  }
  if ( theme ) {
    element.classList.add(`dnd5a-theme-${theme.slugify()}`);
    element.dataset.theme = theme;
  }
  else delete element.dataset.theme;

  // Additional Flags
  if ( (element === document.body) && matchMedia("(prefers-contrast: more)").matches ) flags.add("high-contrast");
  for ( const flag of flags ) element.classList.add(`dnd5a-flag-${flag.slugify()}`);
  element.dataset.themeFlags = Array.from(flags).join(" ");
}
