import MapLocationControlIcon from "./canvas/map-location-control-icon.mjs";
import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

// Namespace Configuration Values
const DND5A = {};

// ASCII Artwork
DND5A.ASCII = `_______________________________
______      ______ _____ _____
|  _  \\___  |  _  \\  ___|  ___|
| | | ( _ ) | | | |___ \\| |__
| | | / _ \\/\\ | | |   \\ \\  __|
| |/ / (_>  < |/ //\\__/ / |___
|___/ \\___/\\/___/ \\____/\\____/
_______________________________`;

/**
 * Configuration data for abilities.
 *
 * @typedef {object} AbilityConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} fullKey                             Fully written key used as alternate for enrichers.
 * @property {string} [reference]                         Reference to a rule page describing this ability.
 * @property {string} [type]                              Whether this is a "physical" or "mental" ability.
 * @property {Object<string, number|string>}  [defaults]  Default values for this ability based on actor type.
 *                                                        If a string is used, the system will attempt to fetch.
 *                                                        the value of the specified ability.
 * @property {string} [icon]                              An SVG icon that represents the ability.
 */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
DND5A.abilities = {
  str: {
    label: "DND5A.AbilityStr",
    abbreviation: "DND5A.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.nUPv6C66Ur64BIUH",
    icon: "systems/dnd5a/icons/svg/abilities/strength.svg"
  },
  dex: {
    label: "DND5A.AbilityDex",
    abbreviation: "DND5A.AbilityDexAbbr",
    type: "physical",
    fullKey: "dexterity",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ER8CKDUWLsFXuARJ",
    icon: "systems/dnd5a/icons/svg/abilities/dexterity.svg"
  },
  con: {
    label: "DND5A.AbilityCon",
    abbreviation: "DND5A.AbilityConAbbr",
    type: "physical",
    fullKey: "constitution",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MpA4jnwD17Q0RPg7",
    icon: "systems/dnd5a/icons/svg/abilities/constitution.svg"
  },
  int: {
    label: "DND5A.AbilityInt",
    abbreviation: "DND5A.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.WzWWcTIppki35YvF",
    icon: "systems/dnd5a/icons/svg/abilities/intelligence.svg",
    defaults: { vehicle: 0 }
  },
  wis: {
    label: "DND5A.AbilityWis",
    abbreviation: "DND5A.AbilityWisAbbr",
    type: "mental",
    fullKey: "wisdom",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v3IPyTtqvXqN934s",
    icon: "systems/dnd5a/icons/svg/abilities/wisdom.svg",
    defaults: { vehicle: 0 }
  },
  cha: {
    label: "DND5A.AbilityCha",
    abbreviation: "DND5A.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9FyghudYFV5QJOuG",
    icon: "systems/dnd5a/icons/svg/abilities/charisma.svg",
    defaults: { vehicle: 0 }
  },
  hon: {
    label: "DND5A.AbilityHon",
    abbreviation: "DND5A.AbilityHonAbbr",
    type: "mental",
    fullKey: "honor",
    defaults: { npc: "cha", vehicle: 0 },
    improvement: false
  },
  san: {
    label: "DND5A.AbilitySan",
    abbreviation: "DND5A.AbilitySanAbbr",
    type: "mental",
    fullKey: "sanity",
    defaults: { npc: "wis", vehicle: 0 },
    improvement: false
  }
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });

/**
 * Configure which ability score is used as the default modifier for initiative rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
DND5A.defaultAbilities = {
  initiative: "dex",
  hitPoints: "con",
  concentration: "con"
};

Object.defineProperties(DND5A, {
  hitPointsAbility: {
    get: function() {
      foundry.utils.logCompatibilityWarning(
        "DND5A.hitPointsAbility has been deprecated and is now accessible through DND5A.defaultAbilities.hitPoints.",
        { since: "DND5A 3.1", until: "DND5A 3.3" }
      );
      return DND5A.defaultAbilities.hitPoints;
    },
    set: function(value) {
      foundry.utils.logCompatibilityWarning(
        "DND5A.hitPointsAbility has been deprecated and is now accessible through DND5A.defaultAbilities.hitPoints.",
        { since: "DND5A 3.1", until: "DND5A 3.3" }
      );
      DND5A.defaultAbilities.hitPoints = value;
    }
  },
  initiativeAbility: {
    get: function() {
      foundry.utils.logCompatibilityWarning(
        "DND5A.initiativeAbility has been deprecated and is now accessible through DND5A.defaultAbilities.initiative.",
        { since: "DND5A 3.1", until: "DND5A 3.3" }
      );
      return DND5A.defaultAbilities.initiative;
    },
    set: function(value) {
      foundry.utils.logCompatibilityWarning(
        "DND5A.initiativeAbility has been deprecated and is now accessible through DND5A.defaultAbilities.initiative.",
        { since: "DND5A 3.1", until: "DND5A 3.3" }
      );
      DND5A.defaultAbilities.initiative = value;
    }
  }
});

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label        Localized label.
 * @property {string} ability      Key for the default ability used by this skill.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this skill.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
DND5A.skills = {
  acr: {
    label: "DND5A.SkillAcr",
    ability: "dex",
    fullKey: "acrobatics",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AvvBLEHNl7kuwPkN",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ani: {
    label: "DND5A.SkillAni",
    ability: "wis",
    fullKey: "animalHandling",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xb3MCjUvopOU4viE",
    icon: "icons/environment/creatures/horse-brown.webp"
  },
  arc: {
    label: "DND5A.SkillArc",
    ability: "int",
    fullKey: "arcana",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.h3bYSPge8IOqne1N",
    icon: "icons/sundries/books/book-embossed-jewel-silver-green.webp"
  },
  ath: {
    label: "DND5A.SkillAth",
    ability: "str",
    fullKey: "athletics",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rIR7ttYDUpH3tMzv",
    icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp"
  },
  dec: {
    label: "DND5A.SkillDec",
    ability: "cha",
    fullKey: "deception",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.mqVZ2fz0L7a9VeKJ",
    icon: "icons/magic/control/mouth-smile-deception-purple.webp"
  },
  his: {
    label: "DND5A.SkillHis",
    ability: "int",
    fullKey: "history",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kRBZbdWMGW9K3wdY",
    icon: "icons/sundries/books/book-embossed-bound-brown.webp"
  },
  ins: {
    label: "DND5A.SkillIns",
    ability: "wis",
    fullKey: "insight",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8R5SMbAGbECNgO8z",
    icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp"
  },
  itm: {
    label: "DND5A.SkillItm",
    ability: "cha",
    fullKey: "intimidation",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4VHHI2gJ1jEsppfg",
    icon: "icons/skills/social/intimidation-impressing.webp"
  },
  inv: {
    label: "DND5A.SkillInv",
    ability: "int",
    fullKey: "investigation",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Y7nmbQAruWOs7WRM",
    icon: "icons/tools/scribal/magnifying-glass.webp"
  },
  med: {
    label: "DND5A.SkillMed",
    ability: "wis",
    fullKey: "medicine",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GeYmM7BVfSCAga4o",
    icon: "icons/tools/cooking/mortar-herbs-yellow.webp"
  },
  nat: {
    label: "DND5A.SkillNat",
    ability: "int",
    fullKey: "nature",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ueMx3uF2PQlcye31",
    icon: "icons/magic/nature/plant-sprout-snow-green.webp"
  },
  prc: {
    label: "DND5A.SkillPrc",
    ability: "wis",
    fullKey: "perception",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zjEeHCUqfuprfzhY",
    icon: "icons/magic/perception/eye-ringed-green.webp"
  },
  prf: {
    label: "DND5A.SkillPrf",
    ability: "cha",
    fullKey: "performance",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hYT7Z06yDNBcMtGe",
    icon: "icons/tools/instruments/lute-gold-brown.webp"
  },
  per: {
    label: "DND5A.SkillPer",
    ability: "cha",
    fullKey: "persuasion",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4R5H8iIsdFQTsj3X",
    icon: "icons/skills/social/diplomacy-handshake.webp"
  },
  rel: {
    label: "DND5A.SkillRel",
    ability: "int",
    fullKey: "religion",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.CXVzERHdP4qLhJXM",
    icon: "icons/magic/holy/saint-glass-portrait-halo.webp"
  },
  slt: {
    label: "DND5A.SkillSlt",
    ability: "dex",
    fullKey: "sleightOfHand",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yg6SRpGNVz9nDW0A",
    icon: "icons/sundries/gaming/playing-cards.webp"
  },
  ste: {
    label: "DND5A.SkillSte",
    ability: "dex",
    fullKey: "stealth",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4MfrpERNiQXmvgCI",
    icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp"
  },
  sur: {
    label: "DND5A.SkillSur",
    ability: "wis",
    fullKey: "survival",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.t3EzDU5b9BVAIEVi",
    icon: "icons/magic/fire/flame-burning-campfire-yellow-blue.webp"
  }
};
preLocalize("skills", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
DND5A.alignments = {
  lg: "DND5A.AlignmentLG",
  ng: "DND5A.AlignmentNG",
  cg: "DND5A.AlignmentCG",
  ln: "DND5A.AlignmentLN",
  tn: "DND5A.AlignmentTN",
  cn: "DND5A.AlignmentCN",
  le: "DND5A.AlignmentLE",
  ne: "DND5A.AlignmentNE",
  ce: "DND5A.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
DND5A.attunementTypes = {
  required: "DND5A.AttunementRequired",
  optional: "DND5A.AttunementOptional"
};
preLocalize("attunementTypes");

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 * @deprecated since 3.2, available until 3.4
 */
DND5A.attunements = {
  0: "DND5A.AttunementNone",
  1: "DND5A.AttunementRequired",
  2: "DND5A.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
DND5A.weaponProficiencies = {
  sim: "DND5A.WeaponSimpleProficiency",
  mar: "DND5A.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/**
 * A mapping between `DND5A.weaponTypes` and `DND5A.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5A.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5A.weaponIds = {
  battleaxe: "I0WocDSuNpGJayPb",
  blowgun: "wNWK6yJMHG9ANqQV",
  club: "nfIRTECQIG81CvM4",
  dagger: "0E565kQUBmndJ1a2",
  dart: "3rCO8MTIdPGSW6IJ",
  flail: "UrH3sMdnUDckIHJ6",
  glaive: "rOG1OM2ihgPjOvFW",
  greataxe: "1Lxk6kmoRhG8qQ0u",
  greatclub: "QRCsxkCwWNwswL9o",
  greatsword: "xMkP8BmFzElcsMaR",
  halberd: "DMejWAc8r8YvDPP1",
  handaxe: "eO7Fbv5WBk5zvGOc",
  handcrossbow: "qaSro7kFhxD6INbZ",
  heavycrossbow: "RmP0mYRn2J7K26rX",
  javelin: "DWLMnODrnHn8IbAG",
  lance: "RnuxdHUAIgxccVwj",
  lightcrossbow: "ddWvQRLmnnIS0eLF",
  lighthammer: "XVK6TOL4sGItssAE",
  longbow: "3cymOVja8jXbzrdT",
  longsword: "10ZP2Bu3vnCuYMIB",
  mace: "Ajyq6nGwF7FtLhDQ",
  maul: "DizirD7eqjh8n95A",
  morningstar: "dX8AxCh9o0A9CkT3",
  net: "aEiM49V8vWpWw7rU",
  pike: "tC0kcqZT9HHAO0PD",
  quarterstaff: "g2dWN7PQiMRYWzyk",
  rapier: "Tobce1hexTnDk4sV",
  scimitar: "fbC0Mg1a73wdFbqO",
  shortsword: "osLzOwQdPtrK3rQH",
  sickle: "i4NeNZ30ycwPDHMx",
  spear: "OG4nBBydvmfWYXIk",
  shortbow: "GJv6WkD7D2J6rP6M",
  sling: "3gynWO9sN4OLGMWD",
  trident: "F65ANO66ckP8FDMa",
  warpick: "2YdfjN1PIIrSHZii",
  warhammer: "F0Df164Xv1gWcYt0",
  whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
DND5A.ammoIds = {
  arrow: "3c7JXOzsv55gqJS5",
  blowgunNeedle: "gBQ8xqTA5f8wP5iu",
  crossbowBolt: "SItCnYBqhzqBoaWG",
  slingBullet: "z9SbsMIBZzuhZOqT"
};

/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
DND5A.toolTypes = {
  art: "DND5A.ToolArtisans",
  game: "DND5A.ToolGamingSet",
  music: "DND5A.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
DND5A.toolProficiencies = {
  ...DND5A.toolTypes,
  vehicle: "DND5A.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
DND5A.toolIds = {
  alchemist: "SztwZhbhZeCqyAes",
  bagpipes: "yxHi57T5mmVt0oDr",
  brewer: "Y9S75go1hLMXUD48",
  calligrapher: "jhjo20QoiD5exf09",
  card: "YwlHI3BVJapz4a3E",
  carpenter: "8NS6MSOdXtUqD7Ib",
  cartographer: "fC0lFK8P4RuhpfaU",
  chess: "23y8FvWKf9YLcnBL",
  cobbler: "hM84pZnpCqKfi8XH",
  cook: "Gflnp29aEv5Lc1ZM",
  dice: "iBuTM09KD9IoM5L8",
  disg: "IBhDAr7WkhWPYLVn",
  drum: "69Dpr25pf4BjkHKb",
  dulcimer: "NtdDkjmpdIMiX7I2",
  flute: "eJOrPcAz9EcquyRQ",
  forg: "cG3m4YlHfbQlLEOx",
  glassblower: "rTbVrNcwApnuTz5E",
  herb: "i89okN7GFTWHsvPy",
  horn: "aa9KuBy4dst7WIW9",
  jeweler: "YfBwELTgPFHmQdHh",
  leatherworker: "PUMfwyVUbtyxgYbD",
  lute: "qBydtUUIkv520DT7",
  lyre: "EwG1EtmbgR3bM68U",
  mason: "skUih6tBvcBbORzA",
  navg: "YHCmjsiXxZ9UdUhU",
  painter: "ccm5xlWhx74d6lsK",
  panflute: "G5m5gYIx9VAUWC3J",
  pois: "il2GNi8C0DvGLL9P",
  potter: "hJS8yEVkqgJjwfWa",
  shawm: "G3cqbejJpfB91VhP",
  smith: "KndVe2insuctjIaj",
  thief: "woWZ1sO5IUVGzo58",
  tinker: "0d08g1i5WXnNrCNA",
  viol: "baoe3U5BfMMMxhCU",
  weaver: "ap9prThUB2y9lDyj",
  woodcarver: "xKErqkLo4ASYr5EP"
};

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
DND5A.scalarTimePeriods = {
  turn: "DND5A.TimeTurn",
  round: "DND5A.TimeRound",
  minute: "DND5A.TimeMinute",
  hour: "DND5A.TimeHour",
  day: "DND5A.TimeDay",
  month: "DND5A.TimeMonth",
  year: "DND5A.TimeYear"
};
preLocalize("scalarTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods for spells that don't have a defined ending.
 * @enum {string}
 */
DND5A.permanentTimePeriods = {
  disp: "DND5A.TimeDisp",
  dstr: "DND5A.TimeDispTrig",
  perm: "DND5A.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
DND5A.specialTimePeriods = {
  inst: "DND5A.TimeInst",
  spec: "DND5A.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
DND5A.timePeriods = {
  ...DND5A.specialTimePeriods,
  ...DND5A.permanentTimePeriods,
  ...DND5A.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
DND5A.staticAbilityActivationTypes = {
  none: "DND5A.NoneActionLabel",
  special: DND5A.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
DND5A.abilityActivationTypes = {
  ...DND5A.staticAbilityActivationTypes,
  action: "DND5A.Action",
  bonus: "DND5A.BonusAction",
  reaction: "DND5A.Reaction",
  minute: DND5A.timePeriods.minute,
  hour: DND5A.timePeriods.hour,
  day: DND5A.timePeriods.day,
  legendary: "DND5A.LegendaryActionLabel",
  mythic: "DND5A.MythicActionLabel",
  lair: "DND5A.LairActionLabel",
  crew: "DND5A.VehicleCrewAction"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
DND5A.abilityConsumptionTypes = {
  ammo: "DND5A.ConsumeAmmunition",
  attribute: "DND5A.ConsumeAttribute",
  hitDice: "DND5A.ConsumeHitDice",
  material: "DND5A.ConsumeMaterial",
  charges: "DND5A.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for actor sizes.
 *
 * @typedef {object} ActorSizeConfiguration
 * @property {string} label                   Localized label.
 * @property {string} abbreviation            Localized abbreviation.
 * @property {number} hitDie                  Default hit die denomination for NPCs of this size.
 * @property {number} [token=1]               Default token size.
 * @property {number} [capacityMultiplier=1]  Multiplier used to calculate carrying capacities.
 */

/**
 * Creature sizes ordered from smallest to largest.
 * @enum {ActorSizeConfiguration}
 */
DND5A.actorSizes = {
  tiny: {
    label: "DND5A.SizeTiny",
    abbreviation: "DND5A.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5
  },
  sm: {
    label: "DND5A.SizeSmall",
    abbreviation: "DND5A.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8
  },
  med: {
    label: "DND5A.SizeMedium",
    abbreviation: "DND5A.SizeMediumAbbr",
    hitDie: 8
  },
  lg: {
    label: "DND5A.SizeLarge",
    abbreviation: "DND5A.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2
  },
  huge: {
    label: "DND5A.SizeHuge",
    abbreviation: "DND5A.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4
  },
  grg: {
    label: "DND5A.SizeGargantuan",
    abbreviation: "DND5A.SizeGargantuanAbbr",
    hitDie: 20,
    token: 4,
    capacityMultiplier: 8
  }
};
preLocalize("actorSizes", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Canvas                                      */
/* -------------------------------------------- */

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
DND5A.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Colors used when a dynamic token ring effects.
 * @enum {number}
 */
DND5A.tokenRingColors = {
  damage: 0xFF0000,
  defeated: 0x000000,
  healing: 0x00FF00,
  temp: 0x33AAFF
};

/* -------------------------------------------- */

/**
 * Configuration data for a map marker style. Options not included will fall back to the value set in `default` style.
 * Any additional styling options added will be passed into the custom marker class and be available for rendering.
 *
 * @typedef {object} MapLocationMarkerStyle
 * @property {typeof PIXI.Container} [icon]  Map marker class used to render the icon.
 * @property {number} [backgroundColor]      Color of the background inside the circle.
 * @property {number} [borderColor]          Color of the border in normal state.
 * @property {number} [borderHoverColor]     Color of the border when hovering over the marker.
 * @property {string} [fontFamily]           Font used for rendering the code on the marker.
 * @property {number} [shadowColor]          Color of the shadow under the marker.
 * @property {number} [textColor]            Color of the text on the marker.
 */

/**
 * Settings used to render map location markers on the canvas.
 * @enum {MapLocationMarkerStyle}
 */
DND5A.mapLocationMarker = {
  default: {
    icon: MapLocationControlIcon,
    backgroundColor: 0xFBF8F5,
    borderColor: 0x000000,
    borderHoverColor: 0xFF5500,
    fontFamily: "Roboto Slab",
    shadowColor: 0x000000,
    textColor: 0x000000
  }
};

/* -------------------------------------------- */

/**
 * Configuration data for creature types.
 *
 * @typedef {object} CreatureTypeConfiguration
 * @property {string} label               Localized label.
 * @property {string} plural              Localized plural form used in swarm name.
 * @property {string} [reference]         Reference to a rule page describing this type.
 * @property {boolean} [detectAlignment]  Is this type detectable by spells such as "Detect Evil and Good"?
 */

/**
 * Default types of creatures.
 * @enum {CreatureTypeConfiguration}
 */
DND5A.creatureTypes = {
  aberration: {
    label: "DND5A.CreatureAberration",
    plural: "DND5A.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yy50qVC1JhPHt4LC",
    detectAlignment: true
  },
  beast: {
    label: "DND5A.CreatureBeast",
    plural: "DND5A.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6bTHn7pZek9YX2tv"
  },
  celestial: {
    label: "DND5A.CreatureCelestial",
    plural: "DND5A.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.T5CJwxjhBbi6oqaM",
    detectAlignment: true
  },
  construct: {
    label: "DND5A.CreatureConstruct",
    plural: "DND5A.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jQGAJZBZTqDFod8d"
  },
  dragon: {
    label: "DND5A.CreatureDragon",
    plural: "DND5A.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k2IRXZwGk9W0PM2S"
  },
  elemental: {
    label: "DND5A.CreatureElemental",
    plural: "DND5A.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.7z1LXGGkXpHuzkFh",
    detectAlignment: true
  },
  fey: {
    label: "DND5A.CreatureFey",
    plural: "DND5A.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.OFsRUt3pWljgm8VC",
    detectAlignment: true
  },
  fiend: {
    label: "DND5A.CreatureFiend",
    plural: "DND5A.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ElHKBJeiJPC7gj6k",
    detectAlignment: true
  },
  giant: {
    label: "DND5A.CreatureGiant",
    plural: "DND5A.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AOXn3Mv5vPZwo0Uf"
  },
  humanoid: {
    label: "DND5A.CreatureHumanoid",
    plural: "DND5A.CreatureHumanoidPl",
    icon: "icons/magic/unholy/strike-body-explode-disintegrate.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iFzQs4AenN8ALRvw"
  },
  monstrosity: {
    label: "DND5A.CreatureMonstrosity",
    plural: "DND5A.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TX0yPEFTn79AMZ8P"
  },
  ooze: {
    label: "DND5A.CreatureOoze",
    plural: "DND5A.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.cgzIC1ecG03D97Fg"
  },
  plant: {
    label: "DND5A.CreaturePlant",
    plural: "DND5A.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1oT7t6tHE4kZuSN1"
  },
  undead: {
    label: "DND5A.CreatureUndead",
    plural: "DND5A.CreatureUndeadPl",
    icon: "icons/magic/death/skull-horned-worn-fire-blue.webp",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.D2BdqS1GeD5rcZ6q",
    detectAlignment: true
  }
};
preLocalize("creatureTypes", { keys: ["label", "plural"], sort: true });

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
DND5A.itemActionTypes = {
  mwak: "DND5A.ActionMWAK",
  rwak: "DND5A.ActionRWAK",
  msak: "DND5A.ActionMSAK",
  rsak: "DND5A.ActionRSAK",
  abil: "DND5A.ActionAbil",
  save: "DND5A.ActionSave",
  ench: "DND5A.ActionEnch",
  summ: "DND5A.ActionSumm",
  heal: "DND5A.ActionHeal",
  util: "DND5A.ActionUtil",
  other: "DND5A.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
DND5A.itemCapacityTypes = {
  items: "DND5A.ItemContainerCapacityItems",
  weight: "DND5A.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
DND5A.itemRarity = {
  common: "DND5A.ItemRarityCommon",
  uncommon: "DND5A.ItemRarityUncommon",
  rare: "DND5A.ItemRarityRare",
  veryRare: "DND5A.ItemRarityVeryRare",
  legendary: "DND5A.ItemRarityLegendary",
  artifact: "DND5A.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * The limited use periods that support a recovery formula.
 * @deprecated since DND5A 3.1, available until DND5A 3.3
 * @enum {string}
 */
DND5A.limitedUseFormulaPeriods = {
  charges: "DND5A.Charges",
  dawn: "DND5A.Dawn",
  dusk: "DND5A.Dusk"
};

/* -------------------------------------------- */

/**
 * Configuration data for limited use periods.
 *
 * @typedef {object} LimitedUsePeriodConfiguration
 * @property {string} label           Localized label.
 * @property {string} abbreviation    Shorthand form of the label.
 * @property {boolean} [formula]      Whether this limited use period restores charges via formula.
 */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
DND5A.limitedUsePeriods = {
  sr: {
    label: "DND5A.UsesPeriods.Sr",
    abbreviation: "DND5A.UsesPeriods.SrAbbreviation"
  },
  lr: {
    label: "DND5A.UsesPeriods.Lr",
    abbreviation: "DND5A.UsesPeriods.LrAbbreviation"
  },
  day: {
    label: "DND5A.UsesPeriods.Day",
    abbreviation: "DND5A.UsesPeriods.DayAbbreviation"
  },
  charges: {
    label: "DND5A.UsesPeriods.Charges",
    abbreviation: "DND5A.UsesPeriods.ChargesAbbreviation",
    formula: true
  },
  dawn: {
    label: "DND5A.UsesPeriods.Dawn",
    abbreviation: "DND5A.UsesPeriods.DawnAbbreviation",
    formula: true
  },
  dusk: {
    label: "DND5A.UsesPeriods.Dusk",
    abbreviation: "DND5A.UsesPeriods.DuskAbbreviation",
    formula: true
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });
patchConfig("limitedUsePeriods", "label", { since: "DND5A 3.1", until: "DND5A 3.3" });

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
DND5A.enchantmentPeriods = {
  sr: {
    label: "DND5A.UsesPeriods.Sr"
  },
  lr: {
    label: "DND5A.UsesPeriods.Lr"
  },
  atwill: {
    label: "DND5A.UsesPeriods.AtWill"
  }
};
preLocalize("enchantmentPeriods", { key: "label" });

/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
DND5A.armorTypes = {
  light: "DND5A.EquipmentLight",
  medium: "DND5A.EquipmentMedium",
  heavy: "DND5A.EquipmentHeavy",
  natural: "DND5A.EquipmentNatural",
  shield: "DND5A.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
DND5A.miscEquipmentTypes = {
  clothing: "DND5A.EquipmentClothing",
  trinket: "DND5A.EquipmentTrinket",
  vehicle: "DND5A.EquipmentVehicle"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
DND5A.equipmentTypes = {
  ...DND5A.miscEquipmentTypes,
  ...DND5A.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
DND5A.vehicleTypes = {
  air: "DND5A.VehicleTypeAir",
  land: "DND5A.VehicleTypeLand",
  space: "DND5A.VehicleTypeSpace",
  water: "DND5A.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
DND5A.armorProficiencies = {
  lgt: "DND5A.ArmorLightProficiency",
  med: "DND5A.ArmorMediumProficiency",
  hvy: "DND5A.ArmorHeavyProficiency",
  shl: "DND5A.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/**
 * A mapping between `DND5A.equipmentTypes` and `DND5A.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
DND5A.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
DND5A.armorIds = {
  breastplate: "SK2HATQ4abKUlV8i",
  chainmail: "rLMflzmxpe8JGTOA",
  chainshirt: "p2zChy24ZJdVqMSH",
  halfplate: "vsgmACFYINloIdPm",
  hide: "n1V07puo0RQxPGuF",
  leather: "WwdpHLXGX5r8uZu5",
  padded: "GtKV1b5uqFQqpEni",
  plate: "OjkIqlW2UpgFcjZa",
  ringmail: "nsXZejlmgalj4he9",
  scalemail: "XmnlF5fgIO3tg6TG",
  splint: "cKpJmsJmU8YaiuqG",
  studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in 5e.
 * @enum {string}
 */
DND5A.shieldIds = {
  shield: "sSs3hSzkKBMNBgTs"
};

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
DND5A.armorClasses = {
  flat: {
    label: "DND5A.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "DND5A.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "DND5A.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "DND5A.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "DND5A.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "DND5A.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "DND5A.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  custom: {
    label: "DND5A.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for an items that have sub-types.
 *
 * @typedef {object} SubtypeTypeConfiguration
 * @property {string} label                       Localized label for this type.
 * @property {Record<string, string>} [subtypes]  Enum containing localized labels for subtypes.
 */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
DND5A.consumableTypes = {
  ammo: {
    label: "DND5A.ConsumableAmmo",
    subtypes: {
      arrow: "DND5A.ConsumableAmmoArrow",
      blowgunNeedle: "DND5A.ConsumableAmmoBlowgunNeedle",
      crossbowBolt: "DND5A.ConsumableAmmoCrossbowBolt",
      slingBullet: "DND5A.ConsumableAmmoSlingBullet"
    }
  },
  potion: {
    label: "DND5A.ConsumablePotion"
  },
  poison: {
    label: "DND5A.ConsumablePoison",
    subtypes: {
      contact: "DND5A.ConsumablePoisonContact",
      ingested: "DND5A.ConsumablePoisonIngested",
      inhaled: "DND5A.ConsumablePoisonInhaled",
      injury: "DND5A.ConsumablePoisonInjury"
    }
  },
  food: {
    label: "DND5A.ConsumableFood"
  },
  scroll: {
    label: "DND5A.ConsumableScroll"
  },
  wand: {
    label: "DND5A.ConsumableWand"
  },
  rod: {
    label: "DND5A.ConsumableRod"
  },
  trinket: {
    label: "DND5A.ConsumableTrinket"
  }
};
preLocalize("consumableTypes", { key: "label", sort: true });
preLocalize("consumableTypes.ammo.subtypes", { sort: true });
preLocalize("consumableTypes.poison.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of containers.
 * @enum {string}
 */
DND5A.containerTypes = {
  backpack: "H8YCd689ezlD26aT",
  barrel: "7Yqbqg5EtVW16wfT",
  basket: "Wv7HzD6dv1P0q78N",
  boltcase: "eJtPBiZtr2pp6ynt",
  bottle: "HZp69hhyNZUUCipF",
  bucket: "mQVYcHmMSoCUnBnM",
  case: "5mIeX824uMklU3xq",
  chest: "2YbuclKfhDL0bU4u",
  flask: "lHS63sC6bypENNlR",
  jug: "0ZBWwjFz3nIAXMLW",
  pot: "M8xM8BLK4tpUayEE",
  pitcher: "nXWdGtzi8DXDLLsL",
  pouch: "9bWTRRDym06PzSAf",
  quiver: "4MtQKPn9qMWCFjDA",
  sack: "CNdDj8dsXVpRVpXt",
  saddlebags: "TmfaFUSZJAotndn9",
  tankard: "uw6fINSmZ2j2o57A",
  vial: "meJEfX3gZgtMX4x2"
};

/* -------------------------------------------- */

/**
 * Configuration data for spellcasting foci.
 *
 * @typedef {object} SpellcastingFocusConfiguration
 * @property {string} label                    Localized label for this category.
 * @property {Object<string, string>} itemIds  Item IDs or UUIDs.
 */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
DND5A.focusTypes = {
  arcane: {
    label: "DND5A.Focus.Arcane",
    itemIds: {
      crystal: "uXOT4fYbgPY8DGdd",
      orb: "tH5Rn0JVRG1zdmPa",
      rod: "OojyyGfh91iViuMF",
      staff: "BeKIrNIvNHRPQ4t5",
      wand: "KA2P6I48iOWlnboO"
    }
  },
  druidic: {
    label: "DND5A.Focus.Druidic",
    itemIds: {
      mistletoe: "xDK9GQd2iqOGH8Sd",
      totem: "PGL6aaM0wE5h0VN5",
      woodenstaff: "FF1ktpb2YSiyv896",
      yewwand: "t5yP0d7YaKwuKKiH"
    }
  },
  holy: {
    label: "DND5A.Focus.Holy",
    itemIds: {
      amulet: "paqlMjggWkBIAeCe",
      emblem: "laVqttkGMW4B9654",
      reliquary: "gP1URGq3kVIIFHJ7"
    }
  }
};
preLocalize("focusTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of "features" items.
 * @enum {SubtypeTypeConfiguration}
 */
DND5A.featureTypes = {
  background: {
    label: "DND5A.Feature.Background"
  },
  class: {
    label: "DND5A.Feature.Class.Label",
    subtypes: {
      arcaneShot: "DND5A.Feature.Class.ArcaneShot",
      artificerInfusion: "DND5A.Feature.Class.ArtificerInfusion",
      channelDivinity: "DND5A.Feature.Class.ChannelDivinity",
      defensiveTactic: "DND5A.Feature.Class.DefensiveTactic",
      eldritchInvocation: "DND5A.Feature.Class.EldritchInvocation",
      elementalDiscipline: "DND5A.Feature.Class.ElementalDiscipline",
      fightingStyle: "DND5A.Feature.Class.FightingStyle",
      huntersPrey: "DND5A.Feature.Class.HuntersPrey",
      ki: "DND5A.Feature.Class.Ki",
      maneuver: "DND5A.Feature.Class.Maneuver",
      metamagic: "DND5A.Feature.Class.Metamagic",
      multiattack: "DND5A.Feature.Class.Multiattack",
      pact: "DND5A.Feature.Class.PactBoon",
      psionicPower: "DND5A.Feature.Class.PsionicPower",
      rune: "DND5A.Feature.Class.Rune",
      superiorHuntersDefense: "DND5A.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "DND5A.Feature.Monster"
  },
  race: {
    label: "DND5A.Feature.Race"
  },
  enchantment: {
    label: "DND5A.Enchantment.Label",
    subtypes: {
      artificerInfusion: "DND5A.Feature.Class.ArtificerInfusion",
      rune: "DND5A.Feature.Class.Rune"
    }
  },
  feat: {
    label: "DND5A.Feature.Feat"
  },
  supernaturalGift: {
    label: "DND5A.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "DND5A.Feature.SupernaturalGift.Blessing",
      charm: "DND5A.Feature.SupernaturalGift.Charm",
      epicBoon: "DND5A.Feature.SupernaturalGift.EpicBoon"
    }
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });
preLocalize("featureTypes.enchantment.subtypes", { sort: true });
preLocalize("featureTypes.supernaturalGift.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for item properties.
 *
 * @typedef {object} ItemPropertyConfiguration
 * @property {string} label           Localized label.
 * @property {string} [abbreviation]  Localized abbreviation.
 * @property {string} [icon]          Icon that can be used in certain places to represent this property.
 * @property {string} [reference]     Reference to a rule page describing this property.
 * @property {boolean} [isPhysical]   Is this property one that can cause damage resistance bypasses?
 * @property {boolean} [isTag]        Is this spell property a tag, rather than a component?
 */

/**
 * The various properties of all item types.
 * @enum {ItemPropertyConfiguration}
 */
DND5A.itemProperties = {
  ada: {
    label: "DND5A.Item.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "DND5A.Item.Property.Ammunition"
  },
  concentration: {
    label: "DND5A.Item.Property.Concentration",
    abbreviation: "DND5A.ConcentrationAbbr",
    icon: "systems/dnd5a/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
    isTag: true
  },
  fin: {
    label: "DND5A.Item.Property.Finesse"
  },
  fir: {
    label: "DND5A.Item.Property.Firearm"
  },
  foc: {
    label: "DND5A.Item.Property.Focus"
  },
  hvy: {
    label: "DND5A.Item.Property.Heavy"
  },
  lgt: {
    label: "DND5A.Item.Property.Light"
  },
  lod: {
    label: "DND5A.Item.Property.Loading"
  },
  material: {
    label: "DND5A.Item.Property.Material",
    abbreviation: "DND5A.ComponentMaterialAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  },
  mgc: {
    label: "DND5A.Item.Property.Magical",
    icon: "systems/dnd5a/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  rch: {
    label: "DND5A.Item.Property.Reach"
  },
  rel: {
    label: "DND5A.Item.Property.Reload"
  },
  ret: {
    label: "DND5A.Item.Property.Returning"
  },
  ritual: {
    label: "DND5A.Item.Property.Ritual",
    abbreviation: "DND5A.RitualAbbr",
    icon: "systems/dnd5a/icons/svg/items/spell.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
    isTag: true
  },
  sil: {
    label: "DND5A.Item.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "DND5A.Item.Property.Somatic",
    abbreviation: "DND5A.ComponentSomaticAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  spc: {
    label: "DND5A.Item.Property.Special"
  },
  stealthDisadvantage: {
    label: "DND5A.Item.Property.StealthDisadvantage"
  },
  thr: {
    label: "DND5A.Item.Property.Thrown"
  },
  two: {
    label: "DND5A.Item.Property.TwoHanded"
  },
  ver: {
    label: "DND5A.Item.Property.Versatile"
  },
  vocal: {
    label: "DND5A.Item.Property.Verbal",
    abbreviation: "DND5A.ComponentVerbalAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  weightlessContents: {
    label: "DND5A.Item.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
DND5A.validProperties = {
  consumable: new Set([
    "mgc"
  ]),
  container: new Set([
    "mgc",
    "weightlessContents"
  ]),
  equipment: new Set([
    "concentration",
    "mgc",
    "stealthDisadvantage"
  ]),
  feat: new Set([
    "concentration",
    "mgc"
  ]),
  loot: new Set([
    "mgc"
  ]),
  weapon: new Set([
    "ada",
    "amm",
    "fin",
    "fir",
    "foc",
    "hvy",
    "lgt",
    "lod",
    "mgc",
    "rch",
    "rel",
    "ret",
    "sil",
    "spc",
    "thr",
    "two",
    "ver"
  ]),
  spell: new Set([
    "vocal",
    "somatic",
    "material",
    "concentration",
    "ritual"
  ]),
  tool: new Set([
    "concentration",
    "mgc"
  ])
};

/* -------------------------------------------- */

/**
 * Configuration data for an item with the "loot" type.
 *
 * @typedef {object} LootTypeConfiguration
 * @property {string} label                       Localized label for this type.
 */

/**
 * Types of "loot" items.
 * @enum {LootTypeConfiguration}
 */
DND5A.lootTypes = {
  art: {
    label: "DND5A.Loot.Art"
  },
  gear: {
    label: "DND5A.Loot.Gear"
  },
  gem: {
    label: "DND5A.Loot.Gem"
  },
  junk: {
    label: "DND5A.Loot.Junk"
  },
  material: {
    label: "DND5A.Loot.Material"
  },
  resource: {
    label: "DND5A.Loot.Resource"
  },
  treasure: {
    label: "DND5A.Loot.Treasure"
  }
};
preLocalize("lootTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * @typedef {object} CurrencyConfiguration
 * @property {string} label         Localized label for the currency.
 * @property {string} abbreviation  Localized abbreviation for the currency.
 * @property {number} conversion    Number by which this currency should be multiplied to arrive at a standard value.
 */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
DND5A.currencies = {
  pp: {
    label: "DND5A.CurrencyPP",
    abbreviation: "DND5A.CurrencyAbbrPP",
    conversion: 0.1
  },
  gp: {
    label: "DND5A.CurrencyGP",
    abbreviation: "DND5A.CurrencyAbbrGP",
    conversion: 1
  },
  ep: {
    label: "DND5A.CurrencyEP",
    abbreviation: "DND5A.CurrencyAbbrEP",
    conversion: 2
  },
  sp: {
    label: "DND5A.CurrencySP",
    abbreviation: "DND5A.CurrencyAbbrSP",
    conversion: 10
  },
  cp: {
    label: "DND5A.CurrencyCP",
    abbreviation: "DND5A.CurrencyAbbrCP",
    conversion: 100
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Damage Types                                */
/* -------------------------------------------- */

/**
 * Configuration data for damage types.
 *
 * @typedef {object} DamageTypeConfiguration
 * @property {string} label          Localized label.
 * @property {string} icon           Icon representing this type.
 * @property {boolean} [isPhysical]  Is this a type that can be bypassed by magical or silvered weapons?
 * @property {string} [reference]    Reference to a rule page describing this damage type.
 * @property {Color} Color           Visual color of the damage type.
 */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
DND5A.damageTypes = {
  acid: {
    label: "DND5A.DamageAcid",
    icon: "systems/dnd5a/icons/svg/damage/acid.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IQhbKRPe1vCPdh8v",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "DND5A.DamageBludgeoning",
    icon: "systems/dnd5a/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.39LFrlef94JIYO8m",
    color: new Color(0x0000A0)
  },
  cold: {
    label: "DND5A.DamageCold",
    icon: "systems/dnd5a/icons/svg/damage/cold.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4xsFUooHDEdfhw6g",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "DND5A.DamageFire",
    icon: "systems/dnd5a/icons/svg/damage/fire.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.f1S66aQJi4PmOng6",
    color: new Color(0xFF4500)
  },
  force: {
    label: "DND5A.DamageForce",
    icon: "systems/dnd5a/icons/svg/damage/force.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFTWzngD8dKWQuUR",
    color: new Color(0x800080)
  },
  lightning: {
    label: "DND5A.DamageLightning",
    icon: "systems/dnd5a/icons/svg/damage/lightning.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9SaxFJ9bM3SutaMC",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "DND5A.DamageNecrotic",
    icon: "systems/dnd5a/icons/svg/damage/necrotic.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.klOVUV5G1U7iaKoG",
    color: new Color(0x006400)
  },
  piercing: {
    label: "DND5A.DamagePiercing",
    icon: "systems/dnd5a/icons/svg/damage/piercing.svg",
    isPhysical: true,
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.95agSnEGTdAmKhyC",
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "DND5A.DamagePoison",
    icon: "systems/dnd5a/icons/svg/damage/poison.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k5wOYXdWPzcWwds1",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "DND5A.DamagePsychic",
    icon: "systems/dnd5a/icons/svg/damage/psychic.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YIKbDv4zYqbE5teJ",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "DND5A.DamageRadiant",
    icon: "systems/dnd5a/icons/svg/damage/radiant.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5tcK9buXWDOw8yHH",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "DND5A.DamageSlashing",
    icon: "systems/dnd5a/icons/svg/damage/slashing.svg",
    isPhysical: true,
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sz2XKQ5lgsdPEJOa",
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "DND5A.DamageThunder",
    icon: "systems/dnd5a/icons/svg/damage/thunder.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iqsmMHk7FSpiNkQy",
    color: new Color(0x708090)
  }
};
preLocalize("damageTypes", { keys: ["label"], sort: true });

/* -------------------------------------------- */

/**
 * Display aggregated damage in chat cards.
 * @type {boolean}
 */
DND5A.aggregateDamageDisplay = true;

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
DND5A.healingTypes = {
  healing: {
    label: "DND5A.Healing",
    icon: "systems/dnd5a/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "DND5A.HealingTemp",
    icon: "systems/dnd5a/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  }
};
preLocalize("healingTypes", { keys: ["label"] });

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
DND5A.movementTypes = {
  burrow: "DND5A.MovementBurrow",
  climb: "DND5A.MovementClimb",
  fly: "DND5A.MovementFly",
  swim: "DND5A.MovementSwim",
  walk: "DND5A.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
DND5A.movementUnits = {
  ft: "DND5A.DistFt",
  mi: "DND5A.DistMi",
  m: "DND5A.DistM",
  km: "DND5A.DistKm"
};
preLocalize("movementUnits");

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
DND5A.rangeTypes = {
  self: "DND5A.DistSelf",
  touch: "DND5A.DistTouch",
  spec: "DND5A.Special",
  any: "DND5A.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `DND5A.movementUnits` and
 * `DND5A.rangeUnits`.
 * @enum {string}
 */
DND5A.distanceUnits = {
  ...DND5A.movementUnits,
  ...DND5A.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configuration data for a weight unit.
 *
 * @typedef {object} WeightUnitConfiguration
 * @property {string} label         Localized label for the unit.
 * @property {string} abbreviation  Localized abbreviation for the unit.
 * @property {number} conversion    Number that by which this unit should be multiplied to arrive at a standard value.
 * @property {string} type          Whether this is an "imperial" or "metric" unit.
 */

/**
 * The valid units for measurement of weight.
 * @enum {WeightUnitConfiguration}
 */
DND5A.weightUnits = {
  lb: {
    label: "DND5A.WeightUnit.Pounds.Label",
    abbreviation: "DND5A.WeightUnit.Pounds.Abbreviation",
    conversion: 1,
    type: "imperial"
  },
  tn: {
    label: "DND5A.WeightUnit.Tons.Label",
    abbreviation: "DND5A.WeightUnit.Tons.Abbreviation",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "DND5A.WeightUnit.Kilograms.Label",
    abbreviation: "DND5A.WeightUnit.Kilograms.Abbreviation",
    conversion: 2.5,
    type: "metric"
  },
  Mg: {
    label: "DND5A.WeightUnit.Megagrams.Label",
    abbreviation: "DND5A.WeightUnit.Megagrams.Abbreviation",
    conversion: 2500,
    type: "metric"
  }
};
preLocalize("weightUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Encumbrance configuration data.
 *
 * @typedef {object} EncumbranceConfiguration
 * @property {Record<string, number>} currencyPerWeight  Pieces of currency that equal a base weight (lbs or kgs).
 * @property {Record<string, object>} effects            Data used to create encumbrance-related Active Effects.
 * @property {object} threshold                          Amount to multiply strength to get given capacity threshold.
 * @property {Record<string, number>} threshold.encumbered
 * @property {Record<string, number>} threshold.heavilyEncumbered
 * @property {Record<string, number>} threshold.maximum
 * @property {Record<string, {ft: number, m: number}>} speedReduction  Speed reduction caused by encumbered status.
 * @property {Record<string, number>} vehicleWeightMultiplier  Multiplier used to determine vehicle carrying capacity.
 * @property {Record<string, Record<string, string>>} baseUnits  Base units used to calculate carrying weight.
 */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @type {EncumbranceConfiguration}
 */
DND5A.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  effects: {
    encumbered: {
      name: "EFFECT.DND5A.StatusEncumbered",
      icon: "systems/dnd5a/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.DND5A.StatusHeavilyEncumbered",
      icon: "systems/dnd5a/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.DND5A.StatusExceedingCarryingCapacity",
      icon: "systems/dnd5a/icons/svg/statuses/exceeding-carrying-capacity.svg"
    }
  },
  threshold: {
    encumbered: {
      imperial: 5,
      metric: 2.5
    },
    heavilyEncumbered: {
      imperial: 10,
      metric: 5
    },
    maximum: {
      imperial: 15,
      metric: 7.5
    }
  },
  speedReduction: {
    encumbered: {
      ft: 10,
      m: 3
    },
    heavilyEncumbered: {
      ft: 20,
      m: 6
    },
    exceedingCarryingCapacity: {
      ft: 5,
      m: 1.5
    }
  },
  baseUnits: {
    default: {
      imperial: "lb",
      metric: "kg"
    },
    vehicle: {
      imperial: "tn",
      metric: "Mg"
    }
  }
};
preLocalize("encumbrance.effects", { key: "name" });

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {string}
 */
DND5A.individualTargetTypes = {
  self: "DND5A.TargetSelf",
  ally: "DND5A.TargetAlly",
  enemy: "DND5A.TargetEnemy",
  creature: "DND5A.TargetCreature",
  object: "DND5A.TargetObject",
  space: "DND5A.TargetSpace",
  creatureOrObject: "DND5A.TargetCreatureOrObject",
  any: "DND5A.TargetAny",
  willing: "DND5A.TargetWilling"
};
preLocalize("individualTargetTypes");

/* -------------------------------------------- */

/**
 * Information needed to represent different area of effect target types.
 *
 * @typedef {object} AreaTargetDefinition
 * @property {string} label        Localized label for this type.
 * @property {string} template     Type of `MeasuredTemplate` create for this target type.
 * @property {string} [reference]  Reference to a rule page describing this area of effect.
 */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
DND5A.areaTargetTypes = {
  radius: {
    label: "DND5A.TargetRadius",
    template: "circle"
  },
  sphere: {
    label: "DND5A.TargetSphere",
    template: "circle",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.npdEWb2egUPnB5Fa"
  },
  cylinder: {
    label: "DND5A.TargetCylinder",
    template: "circle",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZFp4R7tXsIqkiG3"
  },
  cone: {
    label: "DND5A.TargetCone",
    template: "cone",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DqqAOr5JnX71OCOw"
  },
  square: {
    label: "DND5A.TargetSquare",
    template: "rect"
  },
  cube: {
    label: "DND5A.TargetCube",
    template: "rect",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dRfDIwuaHmUQ06uA"
  },
  line: {
    label: "DND5A.TargetLine",
    template: "ray",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6DOoBgg7okm9gBc6"
  },
  wall: {
    label: "DND5A.TargetWall",
    template: "ray"
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
DND5A.targetTypes = {
  ...DND5A.individualTargetTypes,
  ...Object.fromEntries(Object.entries(DND5A.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
DND5A.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Configuration data for rest types.
 *
 * @typedef {object} RestConfiguration
 * @property {Record<string, number>} duration  Duration of different rest variants in minutes.
 */

/**
 * Types of rests.
 * @enum {RestConfiguration}
 */
DND5A.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    }
  },
  long: {
    duration: {
      normal: 480,
      gritty: 10080,
      epic: 60
    }
  }
};

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
DND5A.senses = {
  blindsight: "DND5A.SenseBlindsight",
  darkvision: "DND5A.SenseDarkvision",
  tremorsense: "DND5A.SenseTremorsense",
  truesight: "DND5A.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
DND5A.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Configuration data for pact casting progression.
 *
 * @typedef {object} PactProgressionConfig
 * @property {number} slots  Number of spell slots granted.
 * @property {number} level  Level of spells that can be cast.
 */

/**
 * Define the pact slot & level progression by pact caster level.
 * @enum {PactProgressionConfig}
 */
DND5A.pactCastingProgression = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 }
};

/* -------------------------------------------- */

/**
 * Configuration data for spell preparation modes.
 *
 * @typedef {object} SpellPreparationModeConfiguration
 * @property {string} label           Localized name of this spell preparation type.
 * @property {boolean} [upcast]       Whether this preparation mode allows for upcasting.
 * @property {boolean} [cantrips]     Whether this mode allows for cantrips in a spellbook.
 * @property {number} [order]         The sort order of this mode in a spellbook.
 * @property {boolean} [prepares]     Whether this preparation mode prepares spells.
 */

/**
 * Various different ways a spell can be prepared.
 * @enum {SpellPreparationModeConfiguration}
 */
DND5A.spellPreparationModes = {
  prepared: {
    label: "DND5A.SpellPrepPrepared",
    upcast: true,
    prepares: true
  },
  pact: {
    label: "DND5A.PactMagic",
    upcast: true,
    cantrips: true,
    order: 0.5
  },
  always: {
    label: "DND5A.SpellPrepAlways",
    upcast: true,
    prepares: true
  },
  atwill: {
    label: "DND5A.SpellPrepAtWill",
    order: -30
  },
  innate: {
    label: "DND5A.SpellPrepInnate",
    order: -20
  },
  ritual: {
    label: "DND5A.SpellPrepRitual",
    order: -10
  }
};
preLocalize("spellPreparationModes", { key: "label" });
patchConfig("spellPreparationModes", "label", { since: "DND5A 3.1", until: "DND5A 3.3" });

/* -------------------------------------------- */

/**
 * Subset of `DND5A.spellPreparationModes` that consume spell slots.
 * @deprecated since DND5A 3.1, available until DND5A 3.3
 * @type {string[]}
 */
DND5A.spellUpcastModes = ["always", "pact", "prepared"];

/* -------------------------------------------- */

/**
 * Configuration data for different types of spellcasting supported.
 *
 * @typedef {object} SpellcastingTypeConfiguration
 * @property {string} label                               Localized label.
 * @property {string} img                                 Image used when rendered as a favorite on the sheet.
 * @property {boolean} [shortRest]                        Are these spell slots additionally restored on a short rest?
 * @property {Object<string, SpellcastingProgressionConfiguration>} [progression]  Any progression modes for this type.
 */

/**
 * Configuration data for a spellcasting progression mode.
 *
 * @typedef {object} SpellcastingProgressionConfiguration
 * @property {string} label             Localized label.
 * @property {number} [divisor=1]       Value by which the class levels are divided to determine spellcasting level.
 * @property {boolean} [roundUp=false]  Should fractional values should be rounded up by default?
 */

/**
 * Different spellcasting types and their progression.
 * @type {SpellcastingTypeConfiguration}
 */
DND5A.spellcastingTypes = {
  leveled: {
    label: "DND5A.SpellProgLeveled",
    img: "systems/dnd5a/icons/spell-tiers/{id}.webp",
    progression: {
      full: {
        label: "DND5A.SpellProgFull",
        divisor: 1
      },
      half: {
        label: "DND5A.SpellProgHalf",
        divisor: 2
      },
      third: {
        label: "DND5A.SpellProgThird",
        divisor: 3
      },
      artificer: {
        label: "DND5A.SpellProgArt",
        divisor: 2,
        roundUp: true
      }
    }
  },
  pact: {
    label: "DND5A.SpellProgPact",
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    shortRest: true
  }
};
preLocalize("spellcastingTypes", { key: "label", sort: true });
preLocalize("spellcastingTypes.leveled.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
DND5A.spellProgression = {
  none: "DND5A.SpellNone",
  full: "DND5A.SpellProgFull",
  half: "DND5A.SpellProgHalf",
  third: "DND5A.SpellProgThird",
  pact: "DND5A.SpellProgPact",
  artificer: "DND5A.SpellProgArt"
};
preLocalize("spellProgression", { key: "label" });

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
DND5A.spellLevels = {
  0: "DND5A.SpellLevel0",
  1: "DND5A.SpellLevel1",
  2: "DND5A.SpellLevel2",
  3: "DND5A.SpellLevel3",
  4: "DND5A.SpellLevel4",
  5: "DND5A.SpellLevel5",
  6: "DND5A.SpellLevel6",
  7: "DND5A.SpellLevel7",
  8: "DND5A.SpellLevel8",
  9: "DND5A.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
DND5A.spellScalingModes = {
  none: "DND5A.SpellNone",
  cantrip: "DND5A.SpellCantrip",
  level: "DND5A.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for spell components.
 *
 * @typedef {object} SpellComponentConfiguration
 * @property {string} label         Localized label.
 * @property {string} abbr          Localized abbreviation.
 * @property {string} [reference]   Reference to a rule page describing this component.
 */

/**
 * Types of components that can be required when casting a spell.
 * @deprecated since DND5A 3.0, available until DND5A 3.3
 * @enum {SpellComponentConfiguration}
 */
DND5A.spellComponents = {
  vocal: {
    label: "DND5A.ComponentVerbal",
    abbr: "DND5A.ComponentVerbalAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  somatic: {
    label: "DND5A.ComponentSomatic",
    abbr: "DND5A.ComponentSomaticAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  material: {
    label: "DND5A.ComponentMaterial",
    abbr: "DND5A.ComponentMaterialAbbr",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  }
};
preLocalize("spellComponents", { keys: ["label", "abbr"] });

/* -------------------------------------------- */

/**
 * Configuration data for spell tags.
 *
 * @typedef {object} SpellTagConfiguration
 * @property {string} label         Localized label.
 * @property {string} abbr          Localized abbreviation.
 * @property {string} icon          Icon representing this tag.
 * @property {string} [reference]   Reference to a rule page describing this tag.
 */

/**
 * Supplementary rules keywords that inform a spell's use.
 * @deprecated since DND5A 3.0, available until DND5A 3.3
 * @enum {SpellTagConfiguration}
 */
DND5A.spellTags = {
  concentration: {
    label: "DND5A.Concentration",
    abbr: "DND5A.ConcentrationAbbr",
    icon: "systems/dnd5a/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH"
  },
  ritual: {
    label: "DND5A.Ritual",
    abbr: "DND5A.RitualAbbr",
    icon: "systems/dnd5a/icons/svg/items/spell.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA"
  }
};
preLocalize("spellTags", { keys: ["label", "abbr"] });

/* -------------------------------------------- */

/**
 * Configuration data for spell schools.
 *
 * @typedef {object} SpellSchoolConfiguration
 * @property {string} label        Localized label.
 * @property {string} icon         Spell school icon.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this school.
 */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
DND5A.spellSchools = {
  abj: {
    label: "DND5A.SchoolAbj",
    icon: "systems/dnd5a/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.849AYEWw9FHD6JNz"
  },
  con: {
    label: "DND5A.SchoolCon",
    icon: "systems/dnd5a/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TWyKMhZJZGqQ6uls"
  },
  div: {
    label: "DND5A.SchoolDiv",
    icon: "systems/dnd5a/icons/svg/schools/divination.svg",
    fullKey: "divination",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HoD2MwzmVbMqj9se"
  },
  enc: {
    label: "DND5A.SchoolEnc",
    icon: "systems/dnd5a/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.SehPXk24ySBVOwCZ"
  },
  evo: {
    label: "DND5A.SchoolEvo",
    icon: "systems/dnd5a/icons/svg/schools/evocation.svg",
    fullKey: "evocation",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kGp1RNuxL2SELLRC"
  },
  ill: {
    label: "DND5A.SchoolIll",
    icon: "systems/dnd5a/icons/svg/schools/illusion.svg",
    fullKey: "illusion",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.smEk7kvVyslFozrB"
  },
  nec: {
    label: "DND5A.SchoolNec",
    icon: "systems/dnd5a/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W0eyiV1FBmngb6Qh"
  },
  trs: {
    label: "DND5A.SchoolTrs",
    icon: "systems/dnd5a/icons/svg/schools/transmutation.svg",
    fullKey: "transmutation",
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IYWewSailtmv6qEb"
  }
};
preLocalize("spellSchools", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of spell lists.
 * @enum {string}
 */
DND5A.spellListTypes = {
  class: "ITEM.TypeClass",
  subclass: "ITEM.TypeSubclass",
  background: "ITEM.TypeBackground",
  race: "ITEM.TypeRace",
  other: "JOURNALENTRYPAGE.DND5A.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `DND5A.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
DND5A.spellScrollIds = {
  0: "rQ6sO7HDWzqMhSI3",
  1: "9GSfMg0VOA2b4uFN",
  2: "XdDp6CKh9qEvPTuS",
  3: "hqVKZie7x9w3Kqds",
  4: "DM7hzgL836ZyUFB1",
  5: "wa1VF8TXHmkrrR35",
  6: "tI3rWx4bxefNCexS",
  7: "mtyw4NS1s7j2EJaD",
  8: "aOrinPg7yuDZEuWr",
  9: "O4YbkJkLlnsgUszZ"
};

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
DND5A.weaponTypes = {
  simpleM: "DND5A.WeaponSimpleM",
  simpleR: "DND5A.WeaponSimpleR",
  martialM: "DND5A.WeaponMartialM",
  martialR: "DND5A.WeaponMartialR",
  natural: "DND5A.WeaponNatural",
  improv: "DND5A.WeaponImprov",
  siege: "DND5A.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
DND5A.sourcePacks = {
  BACKGROUNDS: "dnd5a.backgrounds",
  CLASSES: "dnd5a.classes",
  ITEMS: "dnd5a.items",
  RACES: "dnd5a.races"
};

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
DND5A.polymorphSettings = {
  keepPhysical: "DND5A.PolymorphKeepPhysical",
  keepMental: "DND5A.PolymorphKeepMental",
  keepSaves: "DND5A.PolymorphKeepSaves",
  keepSkills: "DND5A.PolymorphKeepSkills",
  mergeSaves: "DND5A.PolymorphMergeSaves",
  mergeSkills: "DND5A.PolymorphMergeSkills",
  keepClass: "DND5A.PolymorphKeepClass",
  keepFeats: "DND5A.PolymorphKeepFeats",
  keepSpells: "DND5A.PolymorphKeepSpells",
  keepItems: "DND5A.PolymorphKeepItems",
  keepBio: "DND5A.PolymorphKeepBio",
  keepVision: "DND5A.PolymorphKeepVision",
  keepSelf: "DND5A.PolymorphKeepSelf"
};
preLocalize("polymorphSettings", { sort: true });

/**
 * Settings to configure how actors are effects are merged when polymorphing is applied.
 * @enum {string}
 */
DND5A.polymorphEffectSettings = {
  keepAE: "DND5A.PolymorphKeepAE",
  keepOtherOriginAE: "DND5A.PolymorphKeepOtherOriginAE",
  keepOriginAE: "DND5A.PolymorphKeepOriginAE",
  keepEquipmentAE: "DND5A.PolymorphKeepEquipmentAE",
  keepFeatAE: "DND5A.PolymorphKeepFeatureAE",
  keepSpellAE: "DND5A.PolymorphKeepSpellAE",
  keepClassAE: "DND5A.PolymorphKeepClassAE",
  keepBackgroundAE: "DND5A.PolymorphKeepBackgroundAE"
};
preLocalize("polymorphEffectSettings", { sort: true });

/**
 * Settings to configure how actors are merged when preset polymorphing is applied.
 * @enum {object}
 */
DND5A.transformationPresets = {
  wildshape: {
    icon: '<i class="fas fa-paw"></i>',
    label: "DND5A.PolymorphWildShape",
    options: {
      keepBio: true,
      keepClass: true,
      keepFeats: true,
      keepMental: true,
      mergeSaves: true,
      mergeSkills: true,
      keepEquipmentAE: false
    }
  },
  polymorph: {
    icon: '<i class="fas fa-pastafarianism"></i>',
    label: "DND5A.Polymorph",
    options: {
      keepEquipmentAE: false,
      keepClassAE: false,
      keepFeatAE: false,
      keepBackgroundAE: false
    }
  },
  polymorphSelf: {
    icon: '<i class="fas fa-eye"></i>',
    label: "DND5A.PolymorphSelf",
    options: {
      keepSelf: true
    }
  }
};
preLocalize("transformationPresets", { sort: true, keys: ["label"] });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
DND5A.proficiencyLevels = {
  0: "DND5A.NotProficient",
  1: "DND5A.Proficient",
  0.5: "DND5A.HalfProficient",
  2: "DND5A.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
DND5A.weaponAndArmorProficiencyLevels = {
  0: "DND5A.NotProficient",
  1: "DND5A.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
DND5A.cover = {
  0: "DND5A.None",
  .5: "DND5A.CoverHalf",
  .75: "DND5A.CoverThreeQuarters",
  1: "DND5A.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
DND5A.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses", "attributes.spelldc",
  "attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
  "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
DND5A.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * @typedef {object} _StatusEffectConfig5e
 * @property {string} icon            Icon used to represent the condition on the token.
 * @property {string} [reference]     UUID of a journal entry with details on this condition.
 * @property {string} [special]       Set this condition as a special status effect under this name.
 * @property {string[]} [riders]      Additional conditions, by id, to apply as part of this condition.
 */

/**
 * Configuration data for system status effects.
 * @typedef {Omit<StatusEffectConfig, "img"> & _StatusEffectConfig5e} StatusEffectConfig5e
 */

/**
 * @typedef {object} _ConditionConfiguration
 * @property {string} label        Localized label for the condition.
 * @property {boolean} [pseudo]    Is this a pseudo-condition, i.e. one that does not appear in the conditions appendix
 *                                 but acts as a status effect?
 * @property {number} [levels]     The number of levels of exhaustion an actor can obtain.
 */

/**
 * Configuration data for system conditions.
 * @typedef {Omit<StatusEffectConfig5e, "name"> & _ConditionConfiguration} ConditionConfiguration
 */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
DND5A.conditionTypes = {
  bleeding: {
    label: "EFFECT.DND5A.StatusBleeding",
    icon: "systems/dnd5a/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    label: "DND5A.ConBlinded",
    icon: "systems/dnd5a/icons/svg/statuses/blinded.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ",
    special: "BLIND"
  },
  charmed: {
    label: "DND5A.ConCharmed",
    icon: "systems/dnd5a/icons/svg/statuses/charmed.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.zZaEBrKkr66OWJvD"
  },
  cursed: {
    label: "EFFECT.DND5A.StatusCursed",
    icon: "systems/dnd5a/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  deafened: {
    label: "DND5A.ConDeafened",
    icon: "systems/dnd5a/icons/svg/statuses/deafened.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY"
  },
  diseased: {
    label: "DND5A.ConDiseased",
    icon: "systems/dnd5a/icons/svg/statuses/diseased.svg",
    pseudo: true,
    reference: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
  },
  exhaustion: {
    label: "DND5A.ConExhaustion",
    icon: "systems/dnd5a/icons/svg/statuses/exhaustion.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv",
    levels: 6
  },
  frightened: {
    label: "DND5A.ConFrightened",
    icon: "systems/dnd5a/icons/svg/statuses/frightened.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij"
  },
  grappled: {
    label: "DND5A.ConGrappled",
    icon: "systems/dnd5a/icons/svg/statuses/grappled.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.gYDAhd02ryUmtwZn"
  },
  incapacitated: {
    label: "DND5A.ConIncapacitated",
    icon: "systems/dnd5a/icons/svg/statuses/incapacitated.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.TpkZgLfxCmSndmpb"
  },
  invisible: {
    label: "DND5A.ConInvisible",
    icon: "systems/dnd5a/icons/svg/statuses/invisible.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.3UU5GCTVeRDbZy9u"
  },
  paralyzed: {
    label: "DND5A.ConParalyzed",
    icon: "systems/dnd5a/icons/svg/statuses/paralyzed.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP",
    statuses: ["incapacitated"]
  },
  petrified: {
    label: "DND5A.ConPetrified",
    icon: "systems/dnd5a/icons/svg/statuses/petrified.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xaNDaW6NwQTgHSmi",
    statuses: ["incapacitated"]
  },
  poisoned: {
    label: "DND5A.ConPoisoned",
    icon: "systems/dnd5a/icons/svg/statuses/poisoned.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx"
  },
  prone: {
    label: "DND5A.ConProne",
    icon: "systems/dnd5a/icons/svg/statuses/prone.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.y0TkcdyoZlOTmAFT"
  },
  restrained: {
    label: "DND5A.ConRestrained",
    icon: "systems/dnd5a/icons/svg/statuses/restrained.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc"
  },
  silenced: {
    label: "EFFECT.DND5A.StatusSilenced",
    icon: "systems/dnd5a/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    label: "DND5A.ConStunned",
    icon: "systems/dnd5a/icons/svg/statuses/stunned.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS",
    statuses: ["incapacitated"]
  },
  surprised: {
    label: "EFFECT.DND5A.StatusSurprised",
    icon: "systems/dnd5a/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    label: "EFFECT.DND5A.StatusTransformed",
    icon: "systems/dnd5a/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    label: "DND5A.ConUnconscious",
    icon: "systems/dnd5a/icons/svg/statuses/unconscious.svg",
    reference: "Compendium.dnd5a.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd",
    statuses: ["incapacitated"],
    riders: ["prone"]
  }
};
preLocalize("conditionTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Various effects of conditions and which conditions apply it. Either keys for the conditions,
 * and with a number appended for a level of exhaustion.
 * @enum {object}
 */
DND5A.conditionEffects = {
  noMovement: new Set(["exhaustion-5", "grappled", "paralyzed", "petrified", "restrained", "stunned", "unconscious"]),
  halfMovement: new Set(["exhaustion-2"]),
  crawl: new Set(["prone", "exceedingCarryingCapacity"]),
  petrification: new Set(["petrified"]),
  halfHealth: new Set(["exhaustion-4"])
};

/* -------------------------------------------- */

/**
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
 * data will be merged into the core data.
 * @enum {Omit<StatusEffectConfig5e, "img"> & {icon: string}}
 */
DND5A.statusEffects = {
  burrowing: {
    name: "EFFECT.DND5A.StatusBurrowing",
    icon: "systems/dnd5a/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.DND5A.StatusConcentrating",
    icon: "systems/dnd5a/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  dead: {
    name: "EFFECT.DND5A.StatusDead",
    icon: "systems/dnd5a/icons/svg/statuses/dead.svg",
    special: "DEFEATED"
  },
  dodging: {
    name: "EFFECT.DND5A.StatusDodging",
    icon: "systems/dnd5a/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.DND5A.StatusEthereal",
    icon: "systems/dnd5a/icons/svg/statuses/ethereal.svg"
  },
  flying: {
    name: "EFFECT.DND5A.StatusFlying",
    icon: "systems/dnd5a/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.DND5A.StatusHiding",
    icon: "systems/dnd5a/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.DND5A.StatusHovering",
    icon: "systems/dnd5a/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.DND5A.StatusMarked",
    icon: "systems/dnd5a/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.DND5A.StatusSleeping",
    icon: "systems/dnd5a/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.DND5A.StatusStable",
    icon: "systems/dnd5a/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */
/*  Languages                                   */
/* -------------------------------------------- */

/**
 * Languages a character can learn.
 * @enum {string}
 */
DND5A.languages = {
  standard: {
    label: "DND5A.LanguagesStandard",
    children: {
      common: "DND5A.LanguagesCommon",
      dwarvish: "DND5A.LanguagesDwarvish",
      elvish: "DND5A.LanguagesElvish",
      giant: "DND5A.LanguagesGiant",
      gnomish: "DND5A.LanguagesGnomish",
      goblin: "DND5A.LanguagesGoblin",
      halfling: "DND5A.LanguagesHalfling",
      orc: "DND5A.LanguagesOrc"
    }
  },
  exotic: {
    label: "DND5A.LanguagesExotic",
    children: {
      aarakocra: "DND5A.LanguagesAarakocra",
      abyssal: "DND5A.LanguagesAbyssal",
      celestial: "DND5A.LanguagesCelestial",
      deep: "DND5A.LanguagesDeepSpeech",
      draconic: "DND5A.LanguagesDraconic",
      gith: "DND5A.LanguagesGith",
      gnoll: "DND5A.LanguagesGnoll",
      infernal: "DND5A.LanguagesInfernal",
      primordial: {
        label: "DND5A.LanguagesPrimordial",
        children: {
          aquan: "DND5A.LanguagesAquan",
          auran: "DND5A.LanguagesAuran",
          ignan: "DND5A.LanguagesIgnan",
          terran: "DND5A.LanguagesTerran"
        }
      },
      sylvan: "DND5A.LanguagesSylvan",
      undercommon: "DND5A.LanguagesUndercommon"
    }
  },
  druidic: "DND5A.LanguagesDruidic",
  cant: "DND5A.LanguagesThievesCant"
};
preLocalize("languages", { key: "label" });
preLocalize("languages.standard.children", { key: "label", sort: true });
preLocalize("languages.exotic.children", { key: "label", sort: true });
preLocalize("languages.exotic.children.primordial.children", { sort: true });
patchConfig("languages", "label", { since: "DND5A 2.4", until: "DND5A 3.1" });

/* -------------------------------------------- */

/**
 * Maximum allowed character level.
 * @type {number}
 */
DND5A.maxLevel = 20;

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
DND5A.maxAbilityScore = 20;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
DND5A.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
DND5A.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

/**
 * @typedef {object} CharacterFlagConfig
 * @property {string} name
 * @property {string} hint
 * @property {string} section
 * @property {typeof boolean|string|number} type
 * @property {string} placeholder
 * @property {string[]} [abilities]
 * @property {Object<string, string>} [choices]
 * @property {string[]} [skills]
 */

/* -------------------------------------------- */

/**
 * Trait configuration information.
 *
 * @typedef {object} TraitConfiguration
 * @property {object} labels
 * @property {string} labels.title         Localization key for the trait name.
 * @property {string} labels.localization  Prefix for a localization key that can be used to generate various
 *                                         plural variants of the trait type.
 * @property {string} icon                 Path to the icon used to represent this trait.
 * @property {string} [actorKeyPath]       If the trait doesn't directly map to an entry as `traits.[key]`, where is
 *                                         this trait's data stored on the actor?
 * @property {string} [configKey]          If the list of trait options doesn't match the name of the trait, where can
 *                                         the options be found within `CONFIG.DND5A`?
 * @property {string} [labelKeyPath]       If config is an enum of objects, where can the label be found?
 * @property {object} [subtypes]           Configuration for traits that take some sort of base item.
 * @property {string} [subtypes.keyPath]   Path to subtype value on base items, should match a category key.
 *                                         Deprecated in favor of the standardized `system.type.value`.
 * @property {string[]} [subtypes.ids]     Key for base item ID objects within `CONFIG.DND5A`.
 * @property {object} [children]           Mapping of category key to an object defining its children.
 * @property {boolean} [sortCategories]    Whether top-level categories should be sorted.
 * @property {boolean} [expertise]         Can an actor receive expertise in this trait?
 */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
DND5A.traits = {
  saves: {
    labels: {
      title: "DND5A.ClassSaves",
      localization: "DND5A.TraitSavesPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-saves.svg",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "DND5A.Skills",
      localization: "DND5A.TraitSkillsPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-skills.svg",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true
  },
  languages: {
    labels: {
      title: "DND5A.Languages",
      localization: "DND5A.TraitLanguagesPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-languages.svg"
  },
  armor: {
    labels: {
      title: "DND5A.TraitArmorProf",
      localization: "DND5A.TraitArmorPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-armor-proficiencies.svg",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "DND5A.TraitWeaponProf",
      localization: "DND5A.TraitWeaponPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-weapon-proficiencies.svg",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] }
  },
  tool: {
    labels: {
      title: "DND5A.TraitToolProf",
      localization: "DND5A.TraitToolPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-tool-proficiencies.svg",
    actorKeyPath: "system.tools",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["toolIds"] },
    children: { vehicle: "vehicleTypes" },
    sortCategories: true,
    expertise: true
  },
  di: {
    labels: {
      title: "DND5A.DamImm",
      localization: "DND5A.TraitDIPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "DND5A.DamRes",
      localization: "DND5A.TraitDRPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "DND5A.DamVuln",
      localization: "DND5A.TraitDVPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  ci: {
    labels: {
      title: "DND5A.ConImm",
      localization: "DND5A.TraitCIPlural"
    },
    icon: "systems/dnd5a/icons/svg/trait-condition-immunities.svg",
    configKey: "conditionTypes"
  }
};
preLocalize("traits", { key: "labels.title" });

/* -------------------------------------------- */

/**
 * Modes used within a trait advancement.
 * @enum {object}
 */
DND5A.traitModes = {
  default: {
    label: "DND5A.AdvancementTraitModeDefaultLabel",
    hint: "DND5A.AdvancementTraitModeDefaultHint"
  },
  expertise: {
    label: "DND5A.AdvancementTraitModeExpertiseLabel",
    hint: "DND5A.AdvancementTraitModeExpertiseHint"
  },
  forcedExpertise: {
    label: "DND5A.AdvancementTraitModeForceLabel",
    hint: "DND5A.AdvancementTraitModeForceHint"
  },
  upgrade: {
    label: "DND5A.AdvancementTraitModeUpgradeLabel",
    hint: "DND5A.AdvancementTraitModeUpgradeHint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfig}
 */
DND5A.characterFlags = {
  diamondSoul: {
    name: "DND5A.FlagsDiamondSoul",
    hint: "DND5A.FlagsDiamondSoulHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "DND5A.FlagsElvenAccuracy",
    hint: "DND5A.FlagsElvenAccuracyHint",
    section: "DND5A.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "DND5A.FlagsHalflingLucky",
    hint: "DND5A.FlagsHalflingLuckyHint",
    section: "DND5A.RacialTraits",
    type: Boolean
  },
  initiativeAdv: {
    name: "DND5A.FlagsInitiativeAdv",
    hint: "DND5A.FlagsInitiativeAdvHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  initiativeAlert: {
    name: "DND5A.FlagsAlert",
    hint: "DND5A.FlagsAlertHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "DND5A.FlagsJOAT",
    hint: "DND5A.FlagsJOATHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "DND5A.FlagsObservant",
    hint: "DND5A.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "DND5A.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "DND5A.FlagsTavernBrawler",
    hint: "DND5A.FlagsTavernBrawlerHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "DND5A.FlagsPowerfulBuild",
    hint: "DND5A.FlagsPowerfulBuildHint",
    section: "DND5A.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "DND5A.FlagsReliableTalent",
    hint: "DND5A.FlagsReliableTalentHint",
    section: "DND5A.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "DND5A.FlagsRemarkableAthlete",
    hint: "DND5A.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "DND5A.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "DND5A.FlagsWeaponCritThreshold",
    hint: "DND5A.FlagsWeaponCritThresholdHint",
    section: "DND5A.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "DND5A.FlagsSpellCritThreshold",
    hint: "DND5A.FlagsSpellCritThresholdHint",
    section: "DND5A.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "DND5A.FlagsMeleeCriticalDice",
    hint: "DND5A.FlagsMeleeCriticalDiceHint",
    section: "DND5A.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
DND5A.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(DND5A.characterFlags));

/* -------------------------------------------- */

/**
 * Different types of actor structures that groups can represent.
 * @enum {object}
 */
DND5A.groupTypes = {
  party: "DND5A.Group.TypeParty",
  encounter: "DND5A.Group.TypeEncounter"
};
preLocalize("groupTypes");

/* -------------------------------------------- */

/**
 * Configuration information for advancement types.
 *
 * @typedef {object} AdvancementTypeConfiguration
 * @property {typeof Advancement} documentClass  The advancement's document class.
 * @property {Set<string>} validItemTypes        What item types this advancement can be used with.
 * @property {boolean} [hidden]                  Should this advancement type be hidden in the selection dialog?
 */

const _ALL_ITEM_TYPES = ["background", "class", "race", "subclass"];

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
DND5A.advancementTypes = {
  AbilityScoreImprovement: {
    documentClass: advancement.AbilityScoreImprovementAdvancement,
    validItemTypes: new Set(["background", "class", "race"])
  },
  HitPoints: {
    documentClass: advancement.HitPointsAdvancement,
    validItemTypes: new Set(["class"])
  },
  ItemChoice: {
    documentClass: advancement.ItemChoiceAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ItemGrant: {
    documentClass: advancement.ItemGrantAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ScaleValue: {
    documentClass: advancement.ScaleValueAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  Size: {
    documentClass: advancement.SizeAdvancement,
    validItemTypes: new Set(["race"])
  },
  Trait: {
    documentClass: advancement.TraitAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  }
};

/* -------------------------------------------- */

/**
 * Default artwork configuration for each Document type and sub-type.
 * @type {Record<string, Record<string, string>>}
 */
DND5A.defaultArtwork = {
  Item: {
    background: "systems/dnd5a/icons/svg/items/background.svg",
    class: "systems/dnd5a/icons/svg/items/class.svg",
    consumable: "systems/dnd5a/icons/svg/items/consumable.svg",
    container: "systems/dnd5a/icons/svg/items/container.svg",
    equipment: "systems/dnd5a/icons/svg/items/equipment.svg",
    feat: "systems/dnd5a/icons/svg/items/feature.svg",
    loot: "systems/dnd5a/icons/svg/items/loot.svg",
    race: "systems/dnd5a/icons/svg/items/race.svg",
    spell: "systems/dnd5a/icons/svg/items/spell.svg",
    subclass: "systems/dnd5a/icons/svg/items/subclass.svg",
    tool: "systems/dnd5a/icons/svg/items/tool.svg",
    weapon: "systems/dnd5a/icons/svg/items/weapon.svg"
  }
};

/* -------------------------------------------- */
/*  Rules                                       */
/* -------------------------------------------- */

/**
 * Configuration information for rule types.
 *
 * @typedef {object} RuleTypeConfiguration
 * @property {string} label         Localized label for the rule type.
 * @property {string} [references]  Key path for a configuration object that contains reference data.
 */

/**
 * Types of rules that can be used in rule pages and the &Reference enricher.
 * @enum {RuleTypeConfiguration}
 */
DND5A.ruleTypes = {
  rule: {
    label: "DND5A.Rule.Type.Rule",
    references: "rules"
  },
  ability: {
    label: "DND5A.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "DND5A.AreaOfEffect",
    references: "areaTargetTypes"
  },
  condition: {
    label: "DND5A.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "DND5A.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "DND5A.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "DND5A.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "DND5A.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "DND5A.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "DND5A.SpellTag",
    references: "itemProperties"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
DND5A.rules = {
  inspiration: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.nkEPI89CiQnOaLYh",
  carryingcapacity: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1PnjDBKbQJIVyc2t",
  push: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  lift: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  drag: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  encumbrance: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JwqYf9qb6gJAWZKs",
  hiding: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.plHuoNdS0j3umPNS",
  passiveperception: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.988C2hQNyvqkdbND",
  time: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eihqNjwpZ3HM4IqY",
  speed: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HhqeIiSj8sE1v1qZ",
  travelpace: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFAISahBloR2X8MX",
  forcedmarch: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uQWQpRKQ1kWhuvjZ",
  difficultterrainpace: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hFW5BR2yHHwwgurD",
  climbing: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  swimming: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  longjump: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1U0myNrOvIVBUdJV",
  highjump: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.raPwIkqKSv60ELmy",
  falling: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kREHL5pgNUOhay9f",
  suffocating: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BIlnr0xYhqt4TGsi",
  vision: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  light: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  lightlyobscured: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MAxtfJyvJV7EpzWN",
  heavilyobscured: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wPFjfRruboxhtL4b",
  brightlight: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RnMokVPyKGbbL8vi",
  dimlight: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.n1Ocpbyhr6HhgbCG",
  darkness: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4dfREIDjG5N4fvxd",
  blindsight: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sacjsfm9ZXnw4Tqc",
  darkvision: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ldmA1PbnEGVkmE11",
  tremorsense: "Compendium.dnd5a.rules.JournalEntry.eVtpEGXjA2tamEIJ.JournalEntryPage.8AIlZ95v54mL531X",
  truesight: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kNa8rJFbtaTM3Rmk",
  food: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jayo7XVgGnRCpTW0",
  water: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iIEI87J7lr2sqtb5",
  resting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dpHJXYLigIdEseIb",
  shortrest: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1s2swI3UsjUUgbt2",
  longrest: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6cLtjbHn4KV2R7G9",
  surprise: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YmOt8HderKveA19K",
  initiative: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RcwElV4GAcVXKWxo",
  bonusaction: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2fu2CXsDg8gQmGGw",
  reaction: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2VqLyxMyMxgXe2wC",
  difficultterrain: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6tqz947qO8vPyxvD",
  beingprone: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.bV8akkBdVUUG21CO",
  droppingprone: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  standingup: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  crawling: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.VWG9qe8PUNtS28Pw",
  movingaroundothercreatures: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9ZWCknaXCOdhyOrX",
  flying: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.0B1fxfmw0a48tPsc",
  size: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HWHRQVBVG7K0RVVW",
  space: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.WIA5bs3P45PmO3OS",
  squeezing: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wKtOwagDAiNfVoPS",
  attack: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.u4GQCzoBig20yRLj",
  castaspell: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GLwN36E4WXn3Cp4Z",
  dash: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Jqn0MEvq6fduYNo6",
  disengage: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ZOPRfI48NyjoloEF",
  dodge: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.V1BkwK2HQrtEfa4d",
  help: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KnrD3u2AnQfmtOWj",
  hide: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BXlHhE4ZoiFwiXLK",
  ready: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8xJzZVelP2AmQGfU",
  search: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5cn1ZTLgQq95vfZx",
  useanobject: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ljqhJx8Qxu2ivo69",
  attackrolls: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5wkqEqhbBD5kDeE7",
  unseenattackers: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  unseentargets: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  rangedattacks: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.S9aclVOCbusLE3kC",
  range: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HjKXuB8ndjcqOds7",
  rangedattacksinclosecombat: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qEZvxW0NM7ixSQP5",
  meleeattacks: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GTk6emvzNxl8Oosl",
  reach: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hgZ5ZN4B3y7tmFlt",
  unarmedstrike: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xJjJ4lhymAYXAOvO",
  opportunityattacks: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zeU0NyCyP10lkLg3",
  twoweaponfighting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FQTS08uH74A6psL2",
  grappling: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Sl4bniSPSbyrakM2",
  escapingagrapple: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2TZKy9YbMN3ZY3h8",
  movingagrappledcreature: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.x5bUdhAD7u5Bt2rg",
  shoving: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hrdqMF8hRXJdNzJx",
  cover: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W7f7PcRubNUMIq2S",
  halfcover: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hv0J61IAfofuhy3Q",
  threequarterscover: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zAMStUjUrPV10dFm",
  totalcover: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BKUAxXuPEzxiEOeL",
  hitpoints: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.PFbzoMBviI2DD9QP",
  damagerolls: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hd26AqKrCqtcQBWy",
  criticalhits: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gFL1VhSEljL1zvje",
  damagetypes: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jVOgf7DNEhkzYNIe",
  damageresistance: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  damagevulnerability: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  healing: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ICketFqbFslqKiX9",
  instantdeath: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8BG05mA0mEzwmrHU",
  deathsavingthrows: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  deathsaves: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  stabilizing: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.r1CgZXLcqFop6Dlx",
  knockingacreatureout: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uEwjgKGuCRTNADYv",
  temporaryhitpoints: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  temphp: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  mounting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  dismounting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  controllingamount: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.khmR2xFk1NxoQUgZ",
  underwatercombat: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6zVOeLyq4iMnrQT4",
  spelllevel: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.A6k5fS0kFqPXTW3v",
  knownspells: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  preparedspells: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  spellslots: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Su6wbb0O9UN4ZDIH",
  castingatahigherlevel: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  upcasting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  castinginarmor: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.z4A8vHSK2pb8YA9X",
  cantrips: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZD5mCTnMPJ9jW67",
  rituals: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
  castingtime: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zRVW8Tvyk6BECjZD",
  bonusactioncasting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RP1WL9FXI3aknlxZ",
  reactioncasting: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.t62lCfinwU9H7Lji",
  longercastingtimes: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gOAIRFCyPUx42axn",
  spellrange: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RBYPyE5z5hAZSbH6",
  components: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xeHthAF9lxfn2tII",
  verbal: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx",
  spellduration: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9mp0SRsptjvJcq1e",
  instantaneous: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kdlgZOpRMB6bGCod",
  concentrating: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
  spelltargets: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.G80AIQr04sxdVpw4",
  areaofeffect: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wvtCeGHgnUmh0cuj",
  pointoforigin: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8HxbRceQQUAhyWRt",
  spellsavingthrows: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8DajfNll90eeKcmB",
  spellattackrolls: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qAFzmGZKhVvAEUF3",
  combiningmagicaleffects: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TMIN963hG773yZzO",
  schoolsofmagic: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TeF6CKMDRpYpsLd4",
  detectingtraps: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  disablingtraps: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  curingmadness: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6Icem7G3CICdNOkM",
  damagethreshold: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9LJZhqvCburpags3",
  poisontypes: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.I6OMMWUaYCWR9xip",
  contactpoison: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kXnCEqqGUWRZeZDj",
  ingestedpoison: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Y0vsJYSWeQcFpJ27",
  inhaledpoison: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KUyN4eK1xTBzXsjP",
  injurypoison: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.LUL48OUq6SJeMGc7",
  attunement: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UQ65OwIyGK65eiOK",
  wearingitems: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  wieldingitems: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  multipleitemsofthesamekind: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rLJdvz4Mde8GkEYQ",
  paireditems: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rd9pCH8yFraSGN34",
  commandword: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HiXixxLYesv6Ff3t",
  consumables: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UEPAcZFzQ5x196zE",
  itemspells: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DABoaeeF6w31UCsj",
  charges: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.NLRXcgrpRCfsA5mO",
  spellscroll: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gi8IKhtOlBVhMJrN",
  creaturetags: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9jV1fFF163dr68vd",
  telepathy: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.geTidcFIYWuUvD2L",
  legendaryactions: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.C1awOyZh78pq1xmY",
  lairactions: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.07PtjpMxiRIhkBEp",
  regionaleffects: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uj8W27NKFyzygPUd",
  disease: "Compendium.dnd5a.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
};

/* -------------------------------------------- */
/*  Token Rings Framework                       */
/* -------------------------------------------- */

/**
 * Token Rings configuration data
 *
 * @typedef {object} TokenRingsConfiguration
 * @property {Record<string, string>} effects        Localized names of the configurable ring effects.
 * @property {string} spriteSheet                    The sprite sheet json source.
 * @property {typeof BaseSamplerShader} shaderClass  The shader class definition associated with the token ring.
 */

/**
 * @type {TokenRingsConfiguration}
 */
DND5A.tokenRings = {
  effects: {
    RING_PULSE: "DND5A.TokenRings.Effects.RingPulse",
    RING_GRADIENT: "DND5A.TokenRings.Effects.RingGradient",
    BKG_WAVE: "DND5A.TokenRings.Effects.BackgroundWave"
  },
  spriteSheet: "systems/dnd5a/tokens/composite/token-rings.json",
  shaderClass: null
};
preLocalize("tokenRings.effects");

/* -------------------------------------------- */
/*  Sources                                     */
/* -------------------------------------------- */

/**
 * List of books available as sources.
 * @enum {string}
 */
DND5A.sourceBooks = {
  "SRD 5.1": "SOURCE.BOOK.SRD"
};
preLocalize("sourceBooks", { sort: true });

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
DND5A.themes = {
  light: "SHEETS.DND5A.THEME.Light",
  dark: "SHEETS.DND5A.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(DND5A, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(DND5A.abilities),
        skills: foundry.utils.deepClone(DND5A.skills),
        spellSchools: foundry.utils.deepClone(DND5A.spellSchools),
        tools: foundry.utils.deepClone(DND5A.toolIds)
      };
      const addFullKeys = key => Object.entries(DND5A[key]).forEach(([k, v]) =>
        _enrichmentLookup[key][slugify(v.fullKey)] = { ...v, key: k }
      );
      addFullKeys("abilities");
      addFullKeys("skills");
      addFullKeys("spellSchools");
    }
    return _enrichmentLookup;
  },
  enumerable: true
});

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within DND5A that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.DND5A.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(DND5A[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default DND5A;
