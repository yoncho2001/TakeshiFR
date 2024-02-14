import { SWORD, MELEE_TYPE, BIG_SWORD, STAF, MAGE_TYPE, BOW, RANGE_TYPE } from "../globalElements/constants";

export const constWeapons = new Map<string, WeaponItem>([
    [SWORD, {
        name: SWORD,
        damage: 20,
        heroClassType: MELEE_TYPE
    }],
    [BIG_SWORD, {
        name: BIG_SWORD,
        damage: 30,
        heroClassType: MELEE_TYPE
    }],
    [STAF, {
        name: STAF,
        damage: 15,
        heroClassType: MAGE_TYPE
    }],
    [BOW, {
        name: BOW,
        damage: 20,
        heroClassType: RANGE_TYPE
    }]
]);

export const defaultMeleeWeapon: WeaponItem = {
    name: SWORD,
    damage: 20,
    heroClassType: MELEE_TYPE
}
export const defaultMageWeapon: WeaponItem = {
    name: STAF,
    damage: 15,
    heroClassType: MAGE_TYPE
};
export const defaultRangeWeapon: WeaponItem = {
    name: BOW,
    damage: 20,
    heroClassType: RANGE_TYPE
}