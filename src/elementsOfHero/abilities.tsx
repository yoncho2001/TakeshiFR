import { BASIC_ATTACK, MELEE_TYPE, MAGE_TYPE, RANGE_TYPE
    ,BASIC_ATTACK_EFFECT, HEAVY_ATTACK, BOLT, BOLT_EFFECT, BREATHE
    , BREATHE_EFFECT } from '../globalElements/constants.tsx';
import Ability from '../classes/Abilities.tsx';

export const constAbilities = new Map<string, Ability>([
    [BASIC_ATTACK, new Ability(BASIC_ATTACK, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BASIC_ATTACK_EFFECT, basicAttack)],
    [HEAVY_ATTACK, new Ability(HEAVY_ATTACK, [MELEE_TYPE, RANGE_TYPE], 2, 0, BASIC_ATTACK_EFFECT, heavyAttack)],
    [BOLT, new Ability(BOLT, [MAGE_TYPE], 3, 20, BOLT_EFFECT, bolt)],
    [BREATHE, new Ability(BREATHE, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BREATHE_EFFECT, breathe)],
    //["DoubleShot", new Ability("DoubleShot", ["Range"], 2, 0, "Shoot two arrows at once", () => { })],
]);

function calkStrength(dealer: AllCharacters): number {
    return dealer.getStrength() + dealer.getPrimaryWeapon().damage;
}

export function basicAttack(dealer: AllCharacters, tanker:AllCharacters): number {
    return calkStrength(dealer) - tanker.getArmor();
}

export function heavyAttack(dealer: AllCharacters, tanker:AllCharacters): number {
    return 2 * calkStrength(dealer) - tanker.getArmor();
}

export function bolt(dealer: AllCharacters, tanker:AllCharacters): number {
    return 3 * calkStrength(dealer) - tanker.getArmor();
}

export function breathe(player: AllCharacters,tanker:AllCharacters): number {
    return 0;
}