import Ability from "./Abilities";

const defaultLevel = 1;

export default class Character {
  protected name: string;
  protected health: number;
  protected strength: number;
  protected armor: number;
  protected abilities: Ability[];
  protected potions: Potion[];
  protected primaryWeapon: WeaponItem;
  protected type: HERO_TYPES;
  protected level: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , type: HERO_TYPES = 'Melee', level: number = defaultLevel) {
    this.name = name;
    this.health = health;
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
  public levelUp(): void {
    this.level += 1;
  }

  public takeDamage(value: number): void {
    if (value > 0) {
      this.health -= value;

      if (this.health < 0) {
        this.health = 0;
      }
    }
  }

  protected toJSON?():HeroToJSON;
}