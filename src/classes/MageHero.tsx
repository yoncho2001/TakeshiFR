import Hero from './Hero.tsx';
import Ability from './Abilities.tsx';
const defaultLevel = 1;
const defaultMana = 100;

export default class MageHero extends Hero {
  private mana: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
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

  public static toJSON(playerName: string): MageHeroJSON {
    const primaryWeapon: WeaponItem =
    {
      name: 'Staf',
      damage: 20,
      heroClassType: 'Mage'
    };
    
    return {
      name: playerName,
      health: 20,
      strength: 10,
      armor: 20,
      abilities: [],
      potions: ['HealthPotion','HealthPotion','ManaPotion'],
      primaryWeapon: primaryWeapon,
      type: "Mage",
      level: 1,
      mana: 30
    }
  }
}