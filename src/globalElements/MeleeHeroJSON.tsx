type MeleeHeroJSON = {
    name: string,
    maxHealth: number,
    strength: number,
    armor: number,
    abilities: string[],
    potions: string[],
    primaryWeapon: string,
    type: HERO_TYPES,
    level: number,
    secondaryWeapon: string
}