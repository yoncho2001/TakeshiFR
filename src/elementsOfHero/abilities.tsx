import Ability from '../classes/Abilities.tsx';

export const constAbilities = new Map<string, Ability>([
    ["BasicAttack", new Ability("BasicAttack", ["Melee", "Mage", "Range"], 0, 0, "Do basic damage.", basicAttack)],
    ["HeavyAttack", new Ability("HeavyAttack", ["Melee", "Range"], 2, 0, "Do double basic damage.", heavyAttack)],
    //["BasicAttackRange", new Ability("BasicAttackRange", ["Range"], 0, 0, "Do basic damage.", () => { })],
    //["HeavyAttackRange", new Ability("HeavyAttackRange", ["Range"], 2, 0, "Do double basic damage.", () => { })],
    ["Bolt", new Ability("Bolt", ["Mage"], 3, 20, "Do electric damage.", bolt)],
    ["Breathe", new Ability("Breathe", ["Melee", "Mage", "Range"], 0, 0, "Take a break.", breathe)],
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