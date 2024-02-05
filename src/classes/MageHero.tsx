import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons,defaultMageWeapon} from '../elementsOfHero/weapons.tsx';
import Ability from './Abilities.tsx';
import Hero from './Hero.tsx';

const defaultLevel = 1;
const defaultMana = 100;

export default class MageHero extends Hero {
  private mana: number;

  constructor(name: string, health: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , level: number = defaultLevel, mana: number = defaultMana) {
    super(name, health, strength, armor, abilities, potions, primaryWeapon
      , "Mage", level);
    this.mana = mana;
  }
  public getMana(): number {
    return this.mana;
  }

  public static fromJSON(json: MageHeroJSON): MageHero {
    const abilities: Ability[] = json.abilities.map(a => {
      return constAbilities.has(a) ? constAbilities.get(a) : null;
    }).filter((a): a is Ability => a !== null);

    const potions: Potion[] = json.potions.map(p => {
      return constPotions.has(p) ? constPotions.get(p) : null;
    }).filter((p): p is Potion => p !== null);

    let primaryWeapon: WeaponItem = constWeapons.has(json.primaryWeapon)
      ? (constWeapons.get(json.primaryWeapon) || defaultMageWeapon) : defaultMageWeapon;
    
    return new MageHero(json.name, json.health, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, json.mana);
  }

  public toJSON(): MageHeroJSON {
    return {
      name: this.name,
      health: this.health,
      strength: this.strength,
      armor: this.armor,
      abilities: this.abilities.map(ability => ability.getName()),
      potions: this.potions.map(potion => potion.name),
      primaryWeapon: this.primaryWeapon.name,
      type: this.type,
      level: this.level,
      mana: this.mana
    }
  }


  public static createCharacterJSON(playerName: string): MageHeroJSON {
    return {
      name: playerName,
      health: 100,
      strength: 10,
      armor: 20,
      abilities: ["BasicAttack"],
      potions: ['HealthPotion', 'HealthPotion', 'ManaPotion'],
      primaryWeapon: 'Staf',
      type: 'Mage',
      level: 1,
      mana: 30
    }
  }
}