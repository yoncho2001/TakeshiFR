import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
import Ability from './Abilities.tsx';
const levelDefault = 1;
const manaDefault = 100;

export default class MageHero extends Hero {
  private mana: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , mana: number = manaDefault, level: number = levelDefault) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
          , "Mage", level);
    this.mana = mana;
  }
  public getMana(): number {
    return this.mana;
  }

  static fromJSON(json: any): MageHero {
    const abilities = json.abilities.map((a: any) => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => { }));
    const potions = json.potions.map((p: any) => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    return new MageHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.mana, json.level);
  } 
}