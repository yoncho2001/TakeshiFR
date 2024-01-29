export const PLAYER_COUNT_LIMIT = 3;
export const PLAYERS_KEY = 'players';
export const defaultHero: MageHeroJSON = {
    name: "Default",
    health: 5,
    strength: 5,
    armor: 5,
    abilities: [],
    potions: [],
    primaryWeapon: {
        name: 'Staf',
        damage: 20,
        heroClassType: "Mage"
    },
    type: "Mage",
    level: 1,
    mana: 5
}