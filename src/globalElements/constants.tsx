import MageHero from "../classes/MageHero";

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
    mana: 5
}

export const defaultHeroClass: MageHero = new MageHero(
    "Default",
    5, 5, 5, [], [],
    {
        name: "Staf",
        damage: 10,
        heroClassType: "Mage"
    },
    20,
    1
);