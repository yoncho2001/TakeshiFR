import Ability from './Abilities.tsx';
import Character from './Character.tsx';
import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons, defaultMeleeWeapon } from '../elementsOfHero/weapons.tsx';
import {
  BASIC_ATTACK, HEAVY_ATTACK, BREATHE, HEALTH_POTION, SWORD, MELEE_TYPE
  , BIG_SWORD
} from '../globalElements/constants.tsx';

const defaultLevel = 1;
const addMaxHealth = 60;
const addStrength = 15;
const addArmor = 10;

export default class MeleeHero extends Character {
  private secondaryWeapon: WeaponItem;

  private addStats(): void {
    this.maxHealth += this.scaleStats(addMaxHealth);
    this.strength += this.scaleStats(addStrength);
    this.armor += this.scaleStats(addArmor);
  }

  private scaleStats(addStat: number): number {
    return addStat * (1 + this.level * 0.5);
  }

  constructor(name: string, maxHealth: number, strength: number, armor: number,
    abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem,
    level: number = defaultLevel, secondaryWeapon: WeaponItem) {
    super(name, maxHealth, strength, armor, abilities, potions, primaryWeapon,
      MELEE_TYPE, level);
    this.secondaryWeapon = secondaryWeapon;
  }

  public getSecondaryWeapon(): WeaponItem {
    return this.secondaryWeapon;
  }

  public swapWeapon() {
    [this.primaryWeapon, this.secondaryWeapon] = [this.secondaryWeapon, this.primaryWeapon];
  }

  public levelUp(): void {
    this.level++;
    const healthPotion = constPotions.get("HealthPotion");

    if (healthPotion) {
      this.potions.push(healthPotion, healthPotion);
    }
    this.addStats();
  }

  public static fromJSON(json: MeleeHeroJSON): MeleeHero {
    const abilities: Ability[] = json.abilities.map(a => {
      return constAbilities.has(a) ? constAbilities.get(a) : null;
    }).filter((a): a is Ability => a !== null);

    const potions: Potion[] = json.potions.map(p => {
      return constPotions.has(p) ? constPotions.get(p) : null;
    }).filter((p): p is Potion => p !== null);

    let primaryWeapon: WeaponItem = constWeapons.has(json.primaryWeapon)
      ? (constWeapons.get(json.primaryWeapon) || defaultMeleeWeapon) : defaultMeleeWeapon;

    let secondaryWeapon: WeaponItem = constWeapons.has(json.secondaryWeapon)
      ? (constWeapons.get(json.secondaryWeapon) || defaultMeleeWeapon) : defaultMeleeWeapon;

    return new MeleeHero(json.name, json.maxHealth, json.strength, json.armor,
      abilities, potions, primaryWeapon, json.level, secondaryWeapon);
  }

  public toJSON(): MeleeHeroJSON {
    return {
      name: this.name,
      maxHealth: this.maxHealth,
      strength: this.strength,
      armor: this.armor,
      abilities: this.abilities.map(ability => ability.getName()),
      potions: this.potions.map(potion => potion.name),
      primaryWeapon: this.primaryWeapon.name,
      type: this.type,
      level: this.level,
      secondaryWeapon: this.secondaryWeapon.name
    }
  }

  public static createCharacterJSON(playerName: string): MeleeHeroJSON {
    return {
      name: playerName,
      maxHealth: 100,
      strength: 15,
      armor: 30,
      abilities: [BASIC_ATTACK, HEAVY_ATTACK, BREATHE],
      potions: [HEALTH_POTION, HEALTH_POTION, HEALTH_POTION],
      primaryWeapon: SWORD,
      type: MELEE_TYPE,
      level: defaultLevel,
      secondaryWeapon: BIG_SWORD
    }
  }
} 
