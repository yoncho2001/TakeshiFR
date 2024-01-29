import Ability from '../classes/Abilities.tsx';

const abilities = new Map<string, Ability>([
    ["BasicAttack", new Ability("BasicAttack", ["Melee", "Mage"], 0, 0, "Do basic damage.", () => { })],
    ["HeavyAttack", new Ability("HeavyAttack", ["Melee", "Mage"], 2, 0, "Do double basic damage.", () => { })],
    ["BasicAttackRange", new Ability("BasicAttackRange", ["Range"], 0, 0, "Do basic damage.", () => { })],
    ["HeavyAttackRange", new Ability("HeavyAttackRange", ["Range"], 2, 0, "Do double basic damage.", () => { })],
    ["Bolt", new Ability("Bolt", ["Mage"], 2, 20, "Do electric damage.", () => { })],
    ["DoubleShot", new Ability("DoubleShot", ["Range"], 2, 0, "Shoot two arrows at once", () => { })],
]);