import Ability from './Abilities.tsx';
import Character from './Character.tsx';
import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons, defaultMeleeWeapon } from '../elementsOfHero/weapons.tsx';
const defaultLevel = 1;
const addMaxHealth = 60;
const addStrength = 15;
const addArmor = 10;


export default class MeleeHero extends Character {
  private secondaryWeapon: WeaponItem;
  
  private addStats(): void {
    this.maxHealth += addMaxHealth;
    this.strength += addStrength;
    this.armor += addArmor;
  }

  constructor(name: string, maxHealth: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , level: number = defaultLevel, secondaryWeapon: WeaponItem) {
    super(name, maxHealth, strength, armor, abilities, potions, primaryWeapon
      , "Melee", level);
    this.secondaryWeapon = secondaryWeapon;
  }

  public getSecondaryWeapon(): WeaponItem {
    return this.secondaryWeapon;
  }

  public swapWeapon() {
    [this.primaryWeapon, this.secondaryWeapon] = [this.secondaryWeapon, this.primaryWeapon];
  }

  public levelUp(): void {
    this.level ++;
    const healthPotion = constPotions.get("HealthPotion");

    if (healthPotion) {
      this.potions.push(healthPotion, healthPotion);
    }
    this.addStats();
  }

  public static fromJSON(json: MeleeHeroJSON): MeleeHero {
    const abilities: Ability[] = json.abilities.map(a => {
      return constAbilities.has(a) ? constAbilities.get(a) : null;
    }).filter((a): a is Ability => a !== null);

    const potions: Potion[] = json.potions.map(p => {
      return constPotions.has(p) ? constPotions.get(p) : null;
    }).filter((p): p is Potion => p !== null);

    let primaryWeapon: WeaponItem = constWeapons.has(json.primaryWeapon)
      ? (constWeapons.get(json.primaryWeapon) || defaultMeleeWeapon) : defaultMeleeWeapon;

    let secondaryWeapon: WeaponItem = constWeapons.has(json.secondaryWeapon)
      ? (constWeapons.get(json.secondaryWeapon) || defaultMeleeWeapon) : defaultMeleeWeapon;

    return new MeleeHero(json.name, json.maxHealth, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, secondaryWeapon);
  }

  public toJSON(): MeleeHeroJSON {
    return {
      name: this.name,
      maxHealth: this.maxHealth,
      strength: this.strength,
      armor: this.armor,
      abilities: this.abilities.map(ability => ability.getName()),
      potions: this.potions.map(potion => potion.name),
      primaryWeapon: this.primaryWeapon.name,
      type: this.type,
      level: this.level,
      secondaryWeapon: this.secondaryWeapon.name
    }
  }

  public static createCharacterJSON(playerName: string): MeleeHeroJSON {
    return {
      name: playerName,
      maxHealth: 100,
      strength: 15,
      armor: 30,
      abilities: ["BasicAttack", "HeavyAttack", "Breathe"],
      potions: ['HealthPotion', 'HealthPotion', 'HealthPotion'],
      primaryWeapon: 'Sword',
      type: 'Melee',
      level: 1,
      secondaryWeapon: 'BigSword'
    }
  }
} 
