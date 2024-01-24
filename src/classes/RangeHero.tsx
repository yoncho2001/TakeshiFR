import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
import Ability from './Abilities.tsx';
const defaultLevel = 1;
const defaulAmmo = 100;

export default class RangeHero extends Hero {
  private ammo: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , ammo: number = defaulAmmo, level: number = defaultLevel) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
          , "Range", level);
    this.ammo = ammo;
  }
  public getAmmo(): number {
    return this.ammo;
  }

  public static fromJSON(json: RangeHeroJSON): RangeHero {
    const abilities = json.abilities.map(a=> new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => { }));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    return new RangeHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.ammo, json.level);
  } 

  public static toDefault(playerName: string): RangeHero {
    const primaryWeapon = new WeaponItem('Bow', 5, 'Range');
    return new RangeHero(playerName, 5, 5, 5, [], [], primaryWeapon,5, 1);
  } 
}