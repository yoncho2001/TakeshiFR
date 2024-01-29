type MeleeHeroJSON = {
    name: string,
    health: number,
    strength: number,
    armor: number,
    abilities: string[],
    potions: string[],
    primaryWeapon: WeaponItemJSON,
    type: HERO_TYPES,
    level: number,
    secondaryWeapon: WeaponItemJSON
}