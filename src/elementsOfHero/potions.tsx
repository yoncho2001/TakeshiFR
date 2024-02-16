import { HEALTH_POTION, HEALTH_POINTS, MANA_POTION, MANA_POINTS } from "../globalElements/constants";

export const constPotions = new Map<string, Potion>([
    [HEALTH_POTION, {
        name: HEALTH_POTION,
        affectingField: HEALTH_POINTS,
        affectingValue: 80
    }],
    [MANA_POTION, {
        name: MANA_POTION,
        affectingField: MANA_POINTS ,
        affectingValue: 50
    }],
]);