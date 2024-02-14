import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons, defaultMageWeapon } from '../elementsOfHero/weapons.tsx';
import { BASIC_ATTACK, BOLT, HEALTH_POTION, MAGE_TYPE, MANA_POTION, STAF } from '../globalElements/constants.tsx';
import Ability from './Abilities.tsx';
import Character from './Character.tsx';

const defaultLevel = 1;
const defaultMana = 100;

const addMana = 15;
const addMaxHealth = 60;
const addStrength = 10;
const addArmor = 10;

export default class MageHero extends Character {
  private mana: number;
  private maxMana: number;


  private addStats(): void {
    this.maxMana += this.scaleStats(addMana);
    this.maxHealth += this.scaleStats(addMaxHealth);
    this.strength += this.scaleStats(addStrength);
    this.armor += this.scaleStats(addArmor);
  }

  private scaleStats(addStat: number): number {
    return addStat * (1 + this.level * 0.5);
  }

  constructor(name: string, maxHealth: number, strength: number, armor: number,
    abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem,
    level: number = defaultLevel, maxMana: number = defaultMana) {
    super(name, maxHealth, strength, armor, abilities, potions, primaryWeapon,
      MAGE_TYPE, level);
    
    this.mana = maxMana;
    this.maxMana = maxMana;
  }

  public getMana(): number {
    return this.mana;
  }

  public getMaxMana(): number {
    return this.maxMana;
  }

  public takeMana(value: number): void {
    if (value > 0) {
      this.mana -= value;

      if (this.mana < 0) {
        this.mana = 0;
      }
    }
  }

  public healMana(value: number): void {
    this.mana += value;

    if (this.mana > this.maxMana) {
      this.mana = this.maxMana;
    }
  }

  public levelUp(): void {
    const healthPotion = constPotions.get(HEALTH_POTION);
    const manaPotion = constPotions.get(MANA_POTION);

    if (healthPotion && manaPotion) {
      this.potions.push(healthPotion, healthPotion);
      this.potions.push(manaPotion, manaPotion);
    }
    this.addStats();
    this.level++;
  }

  public static fromJSON(json: MageHeroJSON): MageHero {
    const abilities: Ability[] = json.abilities.map(a => {
      return constAbilities.has(a) ? constAbilities.get(a) : null;
    }).filter((a): a is Ability => a !== null);

    const potions: Potion[] = json.potions.map(p => {
      return constPotions.has(p) ? constPotions.get(p) : null;
    }).filter((p): p is Potion => p !== null);

    let primaryWeapon: WeaponItem = constWeapons.has(json.primaryWeapon)
      ? (constWeapons.get(json.primaryWeapon) || defaultMageWeapon) : defaultMageWeapon;

    return new MageHero(json.name, json.maxHealth, json.strength, json.armor,
                 abilities, potions, primaryWeapon, json.level, json.maxMana);
  }

  public toJSON(): MageHeroJSON {
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
      maxMana: this.maxMana
    }
  }

  public static createCharacterJSON(playerName: string): MageHeroJSON {
    return {
      name: playerName,
      maxHealth: 100,
      strength: 10,
      armor: 20,
      abilities: [BASIC_ATTACK, BOLT],
      potions: [HEALTH_POTION, HEALTH_POTION, MANA_POTION],
      primaryWeapon: STAF,
      type: MAGE_TYPE,
      level: defaultLevel,
      maxMana: 30
    }
  }
}