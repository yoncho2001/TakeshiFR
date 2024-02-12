export const constWeapons = new Map<string, WeaponItem>([
    ["Sword", {
        name: "Sword",
        damage: 20,
        heroClassType: "Melee"
    }],
    ["BigSword", {
        name: "BigSword",
        damage: 30,
        heroClassType: "Melee"
    }],
    ["Staf", {
        name: "Staf",
        damage: 15,
        heroClassType: "Mage"
    }],
    ["Bow", {
        name: "Bow",
        damage: 20,
        heroClassType: "Range"
    }]
]);

export const defaultMeleeWeapon: WeaponItem = {
    name: "Sword",
    damage: 20,
    heroClassType: "Melee"
}
export const defaultMageWeapon: WeaponItem = {
    name: "Staf",
    damage: 15,
    heroClassType: "Mage"
};
export const defaultRangeWeapon: WeaponItem = {
    name: "Bow",
    damage: 20,
    heroClassType: "Range"
}