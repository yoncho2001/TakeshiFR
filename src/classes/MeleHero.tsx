import Hero from './Hero.tsx';
const defaultLevel = 1;

export default class MeleeHero extends Hero {
  private secondaryWeapon: string;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: string[], potions: string[], primaryWeapon: string
    , level: number = defaultLevel, secondaryWeapon: string) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
      , "Melee", level);
    this.secondaryWeapon = secondaryWeapon;
  }

  public getSecondaryWeapon(): string {
    return this.secondaryWeapon;
  }

  /*public static fromJSON(json: MeleeHeroJSON): MeleeHero {
    const abilities = json.abilities.map(a => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => {}));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    const secondaryWeapon = new WeaponItem(json.secondaryWeapon.name, json.secondaryWeapon.damage, json.secondaryWeapon.heroClassType);

    return new MeleeHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, secondaryWeapon);
  }*/

  public toJSON(): MeleeHeroJSON {
    return {
      name: this.name,
      health: this.health,
      strength: this.strength,
      armor: this.armor,
      abilities: this.abilities,
      potions: this.potions,
      primaryWeapon: this.name,
      type: this.type,
      level: this.level,
      secondaryWeapon: this.secondaryWeapon
    }
  }

  public static createCharacterJSON (playerName: string): MeleeHeroJSON {
    return {
      name: playerName,
      health: 30,
      strength: 15,
      armor: 20,
      abilities: [],
      potions: ['HealthPotion','HealthPotion','HealthPotion'],
      primaryWeapon: 'Sword',
      type: 'Melee',
      level: 1,
      secondaryWeapon: 'BigSword'
    }
  }
} 
