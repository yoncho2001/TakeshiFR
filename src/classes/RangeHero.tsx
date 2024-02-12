import Ability from './Abilities.tsx';
import Character from './Character.tsx';
import { constAbilities } from '../elementsOfHero/abilities.tsx';
import { constPotions } from '../elementsOfHero/potions.tsx';
import { constWeapons, defaultMeleeWeapon } from '../elementsOfHero/weapons.tsx';
const defaultLevel = 1;
const defaultAmmo = 10;

const addMaxHealth = 40;
const addStrength = 20;
const addArmor = 10;
const addAmmo = 10;

export default class RangeHero extends Character {
  private ammo: number;

  private addStats(): void {
    this.maxHealth += addMaxHealth;
    this.strength += addStrength;
    this.armor += addArmor;
    this.ammo += addAmmo;
  }

  constructor(name: string, maxHealth: number, strength: number, armor: number
    , abilities: Ability[], potions: Potion[], primaryWeapon: WeaponItem
    , level: number = defaultLevel, ammo: number = defaultAmmo) {
    super(name, maxHealth, strength, armor, abilities, potions, primaryWeapon
      , "Range", level);
    this.ammo = ammo;
  }

  public getAmmo(): number {
    return this.ammo;
  }

  public useAmmo() {
    this.ammo = this.ammo === 0 ? this.ammo = 0 : this.ammo -= 1;
  }

  public static fromJSON(json: RangeHeroJSON): RangeHero {
    const abilities: Ability[] = json.abilities.map(a => {
      return constAbilities.has(a) ? constAbilities.get(a) : null;
    }).filter((a): a is Ability => a !== null);

    const potions: Potion[] = json.potions.map(p => {
      return constPotions.has(p) ? constPotions.get(p) : null;
    }).filter((p): p is Potion => p !== null);

    let primaryWeapon: WeaponItem = constWeapons.has(json.primaryWeapon)
      ? (constWeapons.get(json.primaryWeapon) || defaultMeleeWeapon) : defaultMeleeWeapon;

    return new RangeHero(json.name, json.maxHealth, json.strength, json.armor, abilities, potions, primaryWeapon, json.level, json.ammo);
  }

  public levelUp(): void {
    this.level ++;
    const healthPotion = constPotions.get("HealthPotion");

    if (healthPotion) {
      this.potions.push(healthPotion, healthPotion, healthPotion);
    }
    this.addStats();
  }

  public toJSON(): RangeHeroJSON {
    return {
      name: this.name,
      maxHealth: this.maxHealth,
      strength: this.strength,
      armor: this.armor,
      abilities: this.abilities.map(ability => ability.getName()),
      potions: this.potions.map(potion => potion.name),
      primaryWeapon: this.name,
      type: this.type,
      level: this.level,
      ammo: this.ammo
    }
  }

  public static createCharacterJSON(playerName: string): RangeHeroJSON {
    return {
      name: playerName,
      maxHealth: 100,
      strength: 20,
      armor: 50,
      abilities: ["BasicAttack"],
      potions: ['HealthPotion', 'HealthPotion', 'HealthPotion', 'HealthPotion'],
      primaryWeapon: 'Bow',
      type: 'Range',
      level: 1,
      ammo: 5
    }
  }
}