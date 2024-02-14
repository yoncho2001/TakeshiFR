import { MELEE_TYPE, defaultLevel } from "../globalElements/constants";
import Ability from "./Abilities";

export default class Character {
  protected name: string;
  protected health: number;
  protected maxHealth: number;
  protected strength: number;
  protected armor: number;
  protected abilities: Ability[];
  protected potions: Potion[];
  protected primaryWeapon: WeaponItem;
  protected type: HERO_TYPES;
  protected level: number;

  constructor(name: string, maxHealth: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , type: HERO_TYPES = MELEE_TYPE, level: number = defaultLevel) {
    this.name = name;
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.strength = strength;
    this.armor = armor;
    this.abilities = abilities;
    this.potions = potions;
    this.primaryWeapon = primaryWeapon;
    this.type = type;
    this.level = level;
  }

  public getName(): string {
    return this.name;
  }

  public getHealth(): number {
    return this.health;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getStrength(): number {
    return this.strength;
  }

  public getArmor(): number {
    return this.armor;
  }

  public getAbilities(): Ability[] {
    return this.abilities;
  }

  public addAbility(ability: Ability): void {
    this.abilities.push(ability);
  }

  public getPotions(): Potion[] {
    return this.potions;
  }

  public setPotions(potions: Potion[]) {
    this.potions = potions;
  }

  public addPotion(potion: Potion): void {
    this.potions.push(potion);
  }

  public getPrimaryWeapon(): WeaponItem {
    return this.primaryWeapon;
  }

  public getType(): HERO_TYPES {
    return this.type;
  }

  public getLevel(): number {
    return this.level;
  }
  public heal(value: number): void {
    this.health += value;

    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }

  public takeDamage(value: number): void {
    if (value > 0) {
      this.health -= value;

      if (this.health < 0) {
        this.health = 0;
      }
    }
  }

  public levelUp?(): void;

  protected toJSON?(): HeroToJSON;
}