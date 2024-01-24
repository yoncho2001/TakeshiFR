import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
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

  public static fromJSON(json: MageHeroJSON): MageHero {
    const abilities = json.abilities.map(a => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => {}));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    return new MageHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.mana, json.level);
  }

  public static toDefault(playerName: string): MageHero {
    const primaryWeapon = new WeaponItem('Staf', 5, 'Mage');
    return new MageHero(playerName, 5, 5, 5, [], [], primaryWeapon,5, 1);
  } 
}