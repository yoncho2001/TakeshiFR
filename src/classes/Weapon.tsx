type HERO_TYPES = 'Melee' | 'Range' | 'Mage';

export default class WeaponItem {
  private name: string;
  private damage: number;
  private heroClassType: HERO_TYPES;

  constructor(name: string, damage: number, heroClassType: HERO_TYPES) {
    this.name = name;
    this.damage = damage;
    this.heroClassType = heroClassType;
  }

  public getName(): string {
    return this.name;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getHeroClass(): HERO_TYPES {
    return this.heroClassType;
  }
}