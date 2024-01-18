import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
import Ability from './Abilities.tsx';
const levelDefault = 1;

export default class MeleeHero extends Hero {
  private secondaryWeapon: WeaponItem;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , secondaryWeapon: WeaponItem,level: number = levelDefault) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
          , "Melee", level);
    this.secondaryWeapon = secondaryWeapon;
  }

  public getSecondaryWeapon(): WeaponItem {
    return this.secondaryWeapon;
  }

  static fromJSON(json: any): MeleeHero {
    const abilities = json.abilities.map((a: any) => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => { }));
    const potions = json.potions.map((p: any) => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    const secondaryWeapon = new WeaponItem(json.secondaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);

    return new MeleeHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, secondaryWeapon, json.level);
  } 
}