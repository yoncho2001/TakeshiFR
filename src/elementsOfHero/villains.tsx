import { DESERT_BOSS, MOUNTAIN_BOSS, DISCO_BOSS, CASTLE_BOSS } from "../globalElements/constants";

export const villainsRegister = new Map<string, levelInfo>([
    [DESERT_BOSS, {
        name: DESERT_BOSS, levelToReech: 1,
        vilainStats: {
            health: 100,
            strenght: 15,
            armorr: 15
        }
    }],
    [MOUNTAIN_BOSS, {
        name: MOUNTAIN_BOSS, levelToReech: 1,
        vilainStats: {
            health: 120,
            strenght: 20,
            armorr: 5
        }
    }],
    [DISCO_BOSS, {
        name: DISCO_BOSS, levelToReech: 3,
        vilainStats: {
            health: 80,
            strenght: 35,
            armorr: 10
        }
    }],
    [CASTLE_BOSS, {
        name: CASTLE_BOSS, levelToReech: 5,
        vilainStats: {
            health: 100,
            strenght: 35,
            armorr: 25
        }
    }]
]);