import Ability from "../classes/Abilities";
import Character from "../classes/Character";
import { basicAttack, heavyAttack, breathe } from "../elementsOfHero/abilities";

const defaultLevel = 1;

export default class Villain extends Character {
  constructor(levelInfo: levelInfo, level: number = defaultLevel) {
    super(levelInfo.name, level * levelInfo.vilainStats.health
      , level * levelInfo.vilainStats.strenght
      , level * levelInfo.vilainStats.armorr,
      [new Ability("BasicAttack", ["Melee", "Mage", "Range"], 0, 0, "Do basic damage.", basicAttack),
      new Ability("HeavyAttack", ["Melee", "Range"], 2, 0, "Do double basic damage.", heavyAttack),
      new Ability("Miss", ["Melee", "Mage", "Range"], 0, 0, "Take a break.", breathe)
      ], [],
      {
        name: levelInfo.name + "Weapon",
        damage: level * 15,
        heroClassType: "Melee"
      },
      "Melee");
  }
} 