import Ability from "../classes/Abilities";
import Character from "../classes/Character";
import { basicAttack, heavyAttack,miss } from "../elementsOfHero/abilities";

const defaultLevel = 1;

export default class Villain extends Character {
  constructor(name: string, level: number = defaultLevel){
    super(name, level * 100, level * 30, level * 30,
        [new Ability("BasicAttack", ["Melee", "Mage", "Range"], 0, 0, "Do basic damage.", basicAttack),
        new Ability("HeavyAttack", ["Melee", "Range"], 2, 0, "Do double basic damage.", heavyAttack),
        new Ability("Miss", ["Melee", "Mage", "Range"], 0, 0, "Do 0 damage.", miss)
        ], [],
        {
            name: name + "Weapon",
            damage: level * 10,
            heroClassType: "Melee"
        },
        "Melee");
  }
} 