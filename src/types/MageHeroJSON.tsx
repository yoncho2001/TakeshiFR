type MageHeroJSON = {
    name: string;
    health: number;
    strength: number;
    armor: number;
    abilities: AbilityJSON[];
    potions: PotionJSON[];
    primaryWeapon: WeaponItemJSON;
    type: HERO_TYPES;
    level: number;
    mana: number;
}