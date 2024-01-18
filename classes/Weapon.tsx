 export default class WeaponItem {
    private name: string;
    private damage: number;
    private heroClassType: 'Melee' | 'Range' | 'Mage';
  
    constructor(name: string, damage: number, heroClassType: 'Melee' | 'Range' | 'Mage') {
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

    public getHeroClass(): string {
      return this.heroClassType;
    }
}