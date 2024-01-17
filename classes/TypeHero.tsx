import WeaponItem from './Weapon.tsx';
import Hero from './Hero.tsx';
import Potion from './Potions.tsx';
import Ability from './Abilities.tsx';


export default class MeleeHero extends Hero {
    private secondaryWeapon: WeaponItem;
  
    constructor(name: string, health: number, strength: number, armor: number
        , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem, secondaryWeapon: WeaponItem)
    {
      super(name, health, strength, armor, abilities, potions, primaryWeapon);
      this.secondaryWeapon = secondaryWeapon;
    }
    public getSecondaryWeapon(): WeaponItem {
      return this.secondaryWeapon;
    }

}