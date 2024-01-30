import Hero from './Hero.tsx';
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

  /*public static fromJSON(json: MeleeHeroJSON): MeleeHero {
    const abilities = json.abilities.map(a => new Ability(a.name, a.heroClassType, a.cooldown, a.cost, a.effect, () => {}));
    const potions = json.potions.map(p => new Potion(p.name, p.affectingField, p.affectingValue));
    const primaryWeapon = new WeaponItem(json.primaryWeapon.name, json.primaryWeapon.damage, json.primaryWeapon.heroClassType);
    const secondaryWeapon = new WeaponItem(json.secondaryWeapon.name, json.secondaryWeapon.damage, json.secondaryWeapon.heroClassType);

    return new MeleeHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, secondaryWeapon);
  }*/

  public static DefoultToJSON(playerName: string): MeleeHeroJSON {
    const primaryWeapon: WeaponItem =
    {
      name: 'Sword',
      damage: 20,
      heroClassType: 'Melee'
    };
    const secondaryWeapon: WeaponItem =
    {
      name: 'BigSword',
      damage: 20,
      heroClassType: 'Melee'
    };

    return {
      name: playerName,
      health: 10,
      strength: 10,
      armor: 10,
      abilities: [],
      potions: ['HealthPotion','HealthPotion','HealthPotion'],
      primaryWeapon: primaryWeapon,
      type: "Melee",
      level: 1,
      secondaryWeapon: secondaryWeapon
    }
  }
} 
