import {
    BASIC_ATTACK, MELEE_TYPE, MAGE_TYPE, RANGE_TYPE,
    BASIC_ATTACK_EFFECT, HEAVY_ATTACK, BOLT, BOLT_EFFECT, BREATHE,
    BREATHE_EFFECT, MEDITATE, HEAL, HEAL_EFFECT, MEDITATE_EFFECT,
    HEAVY_ATTACK_EFFECT
} from '../globalElements/constants.tsx';
import Ability from '../classes/Abilities.tsx';

const healMana = 20;


export const constAbilities = new Map<string, Ability>([
    [BASIC_ATTACK, new Ability(BASIC_ATTACK, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BASIC_ATTACK_EFFECT, basicAttack)],
    [HEAVY_ATTACK, new Ability(HEAVY_ATTACK, [MELEE_TYPE, RANGE_TYPE], 2, 0, HEAVY_ATTACK_EFFECT, heavyAttack)],
    [BOLT, new Ability(BOLT, [MAGE_TYPE], 3, 20, BOLT_EFFECT, bolt)],
    [MEDITATE, new Ability(MEDITATE, [MAGE_TYPE], 1, 0, MEDITATE_EFFECT, meditate)],
    [HEAL, new Ability(HEAL, [MAGE_TYPE], 2, 10, HEAL_EFFECT, heal)],
    [BREATHE, new Ability(BREATHE, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BREATHE_EFFECT, breathe)],
    //["DoubleShot", new Ability("DoubleShot", ["Range"], 2, 0, "Shoot two arrows at once", () => { })],
]);

function calkStrength(dealer: AllCharacters): number {
    return dealer.getStrength() + dealer.getPrimaryWeapon().damage;
}

export function basicAttack(dealer: AllCharacters, tanker: AllCharacters): number {
    return calkStrength(dealer) - tanker.getArmor();
}

export function heavyAttack(dealer: AllCharacters, tanker: AllCharacters): number {
    return 2 * calkStrength(dealer) - tanker.getArmor();
}

export function bolt(dealer: AllCharacters, tanker: AllCharacters): number {
    return 3 * calkStrength(dealer) - tanker.getArmor();
}

export function meditate(dealer: AllCharacters): number {
    if ('mana' in dealer) {
        dealer.healMana(healMana);
    }

    return 0;
}

export function heal(dealer: AllCharacters): number {
    if ('mana' in dealer) {
        dealer.heal(2 * dealer.getPrimaryWeapon().damage);
    }

    return 0;
}

export function breathe(): number {
    return 0;
}