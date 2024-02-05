export const constPotions = new Map<string, Potion>([
    ["HealthPotion", {
        name: "HealthPotion",
        affectingField: "HealthPoints",
        affectingValue: 50
    }],
    ["ManaPotion", {
        name: "ManaPotion",
        affectingField: "Mana",
        affectingValue: 50
    }],
]);