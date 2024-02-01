const defaultLevel = 1;

export default class Hero {
  protected name: string;
  protected health: number;
  protected strength: number;
  protected armor: number;
  protected abilities: string[];
  protected potions: string[];
  protected primaryWeapon: string;
  protected type: HERO_TYPES;
  protected level: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: string[], potions: string[], primaryWeapon: string
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

  public getAbilities(): string[] {
    return this.abilities;
  }

  public addAbility(ability: string): void {
    this.abilities.push(ability);
  }

  public getPotions(): string[] {
    return this.potions;
  }

  public addPotion(potion: string): void {
    this.potions.push(potion);
  }

  public getPrimaryWeapon(): string {
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

  public Hi(): void {
    console.log("hi hero");
  }
}