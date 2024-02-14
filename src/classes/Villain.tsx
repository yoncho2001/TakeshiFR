import Ability from "../classes/Abilities";
import Character from "../classes/Character";
import { basicAttack, heavyAttack, breathe } from "../elementsOfHero/abilities";
import { BASIC_ATTACK, MELEE_TYPE, MAGE_TYPE, RANGE_TYPE, BASIC_ATTACK_EFFECT
       , HEAVY_ATTACK, HEAVY_ATTACK_EFFECT, BREATHE, BREATHE_EFFECT } from "../globalElements/constants";

const defaultLevel = 1;

export default class Villain extends Character {
  constructor(levelInfo: levelInfo, level: number = defaultLevel) {
    super(levelInfo.name, level * levelInfo.vilainStats.health
      , level * levelInfo.vilainStats.strenght
      , level * levelInfo.vilainStats.armorr,
      [new Ability(BASIC_ATTACK, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BASIC_ATTACK_EFFECT, basicAttack),
      new Ability(HEAVY_ATTACK, [MELEE_TYPE, RANGE_TYPE], 2, 0, HEAVY_ATTACK_EFFECT, heavyAttack),
      new Ability(BREATHE, [MELEE_TYPE, MAGE_TYPE, RANGE_TYPE], 0, 0, BREATHE_EFFECT, breathe)
      ], [],
      {
        name: levelInfo.name + "Weapon",
        damage: level * 15,
        heroClassType: MELEE_TYPE
      },
      MELEE_TYPE);
  }
} 