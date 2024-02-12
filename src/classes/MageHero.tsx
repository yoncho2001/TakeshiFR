import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons, defaultMageWeapon } from '../elementsOfHero/weapons.tsx';
import Ability from './Abilities.tsx';
import Character from './Character.tsx';
const MAX_MANA = 100;
const defaultLevel = 1;
const defaultMana = 100;

const addMana = 20;
const addMaxHealth = 100;
const addStrength = 10;
const addArmor = 10;

export default class MageHero extends Character {
  private mana: number;

  private addStats(): void {
    this.mana += addMana;
    this.maxHealth += addMaxHealth;
    this.strength += addStrength;
    this.armor += addArmor;
  }

  constructor(name: string, maxHealth: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , level: number = defaultLevel, mana: number = defaultMana) {
    super(name, maxHealth, strength, armor, abilities, potions, primaryWeapon
      , "Mage", level);
    this.mana = mana;
  }

  public getMana(): number {
    return this.mana;
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

    if (this.mana > MAX_MANA) {
      this.mana = MAX_MANA;
    }
  }

  public levelUp(): void {
    this.level ++;
    const healthPotion = constPotions.get("HealthPotion");
    const manaPotion = constPotions.get("ManaPotion");

    if (healthPotion && manaPotion) {
      this.potions.push(healthPotion, healthPotion);
      this.potions.push(manaPotion, manaPotion);
    }
    this.addStats();
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

    return new MageHero(json.name, json.maxHealth, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, json.mana);
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
      mana: this.mana
    }
  }

  public static createCharacterJSON(playerName: string): MageHeroJSON {
    return {
      name: playerName,
      maxHealth: 100,
      strength: 10,
      armor: 20,
      abilities: ["BasicAttack", "Bolt"],
      potions: ['HealthPotion', 'HealthPotion', 'ManaPotion'],
      primaryWeapon: 'Staf',
      type: 'Mage',
      level: 1,
      mana: 30
    }
  }
}