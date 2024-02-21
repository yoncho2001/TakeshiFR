export const PLAYER_COUNT_LIMIT = 3;
export const PLAYERS_KEY = 'players';
export const defaultHero: MageHeroJSON = {
    name: "Default",
    maxHealth: 5,
    strength: 5,
    armor: 5,
    abilities: [],
    potions: [],
    primaryWeapon: 'Staf',
    type: "Mage",
    level: 1,
    maxMana: 5
}

//Hero constants
export const defaultLevel = 1;
export const MELEE_TYPE = 'Melee';
export const MAGE_TYPE = 'Mage';
export const RANGE_TYPE = 'Range';

//Villains constants
export const DESERT_BOSS = 'DesertDead';
export const MOUNTAIN_BOSS = 'MountainGiant';
export const DISCO_BOSS = 'DiscoCrawler';
export const CASTLE_BOSS = 'CastleJuggerknight';

//Potion constants
export const HEALTH_POTION = 'HealthPotion';
export const HEALTH_POINTS = 'HealthPoints';

export const MANA_POTION = 'ManaPotion';
export const MANA_POINTS = 'Mana';

export const STRENGHT_POTION = 'StrengthPotion';
export const STRENGHT_POINTS = 'Strength';

//Weapons constants
export const SWORD = 'Sword';
export const BIG_SWORD = 'BigSword';
export const STAF = 'Staf';
export const BOW = 'Bow';

//Ability constants
export const BASIC_ATTACK = 'BasicAttack';
export const BASIC_ATTACK_EFFECT = 'Do basic damage.';

export const HEAVY_ATTACK = 'HeavyAttack';
export const HEAVY_ATTACK_EFFECT = 'Do double basic damage.';

export const BREATHE = 'Breathe';
export const BREATHE_EFFECT = 'Take a break.';

export const BOLT = 'Bolt';
export const BOLT_EFFECT = "Do electric damage.";

export const MEDITATE = 'Meditate';
export const MEDITATE_EFFECT = "Recharge mana.";

export const HEAL = 'Heal';
export const HEAL_EFFECT = "Heal hp.";
