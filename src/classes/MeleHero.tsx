import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
import Ability from './Abilities.tsx';
const defaultLevel = 1;

export default class MeleeHero extends Hero {
  private secondaryWeapon: WeaponItem;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , level: number = defaultLevel, secondaryWeapon: WeaponItem) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
      , "Melee", level);
    this.secondaryWeapon = secondaryWeapon;
  }

  public getSecondaryWeapon(): WeaponItem {
    return this.secondaryWeapon;
  }

  public static fromJSON(json: MeleeHeroJSON): MeleeHero {
    const abilities = json.abilities.map(a => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => {}));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    const secondaryWeapon = new WeaponItem(json.secondaryWeapon.name, json.secondaryWeapon.damage, json.secondaryWeapon.heroClassType);

    return new MeleeHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, secondaryWeapon);
  }

  public static toDefault(playerName: string): MeleeHero {
    const primaryWeapon = new WeaponItem('Sword', 5, 'Melee');
    const secondaryWeapon = new WeaponItem('BigSword', 5, 'Melee');
    return new MeleeHero(playerName, 5, 5, 5, [], [], primaryWeapon,1, secondaryWeapon);
  } 
} 
