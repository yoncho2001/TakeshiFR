import Hero from './Hero.tsx';
const defaultLevel = 1;
const defaultMana = 100;

export default class MageHero extends Hero {
  private mana: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: string[], potions: string[], primaryWeapon: string
    , mana: number = defaultMana, level: number = defaultLevel) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
          , "Mage", level);
    this.mana = mana;
  }
  public getMana(): number {
    return this.mana;
  }

  /*public static fromJSON(json: MageHeroJSON): MageHero {
    const abilities = json.abilities.map(a => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => {}));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    return new MageHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.mana, json.level);
  }*/

  public toJSON(): MageHeroJSON {
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
      mana: this.mana
    }
  }


  public static createCharacterJSON (playerName: string): MageHeroJSON {   
    return {
      name: playerName,
      health: 20,
      strength: 10,
      armor: 20,
      abilities: [],
      potions: ['HealthPotion','HealthPotion','ManaPotion'],
      primaryWeapon: 'Staf',
      type: 'Mage',
      level: 1,
      mana: 30
    }
  }
}