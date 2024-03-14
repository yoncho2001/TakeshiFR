import '@testing-library/jest-dom'
import Ability from '../classes/Abilities'
import MageHero from '../classes/MageHero';
import { DESERT_BOSS, defaultMage, defaultMelee, defaultRange } from '../globalElements/constants';
import Villain from '../classes/Villain';
import MeleeHero from '../classes/MeleeHero';
import RangeHero from '../classes/RangeHero';

const testAbility = new Ability("Test", ["Melee", "Mage"], 1, 0, "Test efect", testEfect)
const testMage = MageHero.fromJSON(defaultMage);
const testMelee = MeleeHero.fromJSON(defaultMelee);
const testRange = RangeHero.fromJSON(defaultRange);
const testVillainJSON ={
    name: DESERT_BOSS, levelToReech: 1,
    vilainStats: {
        health: 100,
        strenght: 15,
        armorr: 10
    }
}
const testVillain = new Villain(testVillainJSON, 1)

function testEfect(dealer: AllCharacters, tanker: AllCharacters): number {
    return dealer.getStrength() + dealer.getPrimaryWeapon().damage - tanker.getArmor();
}


test("Test Abilities", () => {
  expect(testAbility.getName()).toBe("Test");
  expect(testAbility.getHeroClassType()).toStrictEqual(["Melee", "Mage"]);
  expect(testAbility.getCooldown()).toBe(1);
  expect(testAbility.getCooldownCount()).toBe(0);
  expect(testAbility.getCost()).toBe(0);
  expect(testAbility.getEffect()).toBe("Test efect");

  testAbility.lowerCooldown();
  expect(testAbility.getCooldownCount()).toBe(0);

  testAbility.setcooldownCount();
  expect(testAbility.getCooldownCount()).toBe(1);
  testAbility.lowerCooldown();
  expect(testAbility.getCooldownCount()).toBe(0);

  testAbility.resetcooldownCount();
  expect(testAbility.getCooldownCount()).toBe(0);

  expect(testAbility.use(testMage,testVillain)).toBe(5);
})

test("Test Caracter", () => {
    expect(testMage.getName()).toBe("Default");
    expect(testMage.getMaxHealth()).toBe(5);
    expect(testMage.getStrength()).toBe(5);
    expect(testMage.getArmor()).toBe(5);

    expect(testMage.getHealth()).toBe(5);

    testMage.addAbility(testAbility);
    expect(testMage.getAbilities()[0].getName()).toBe("Test");
  
    expect(testMage.getPrimaryWeapon().name).toBe('Staf');
    expect(testMage.getType()).toBe('Mage');
    expect(testMage.getLevel()).toBe(1);

    expect(testMage.getHealth()).toBe(5);
    testMage.takeDamage(2);
    expect(testMage.getHealth()).toBe(3);
    testMage.heal(4);
    expect(testMage.getHealth()).toBe(5);  
  })

  test("Test MageHero", () => {
    expect(testMage.getMaxMana()).toBe(5);

    testMage.takeMana(3);
    expect(testMage.getMana()).toBe(2);
    testMage.healMana(5);
    expect(testMage.getMana()).toBe(5);

    testMage.levelUp();
    expect(testMage.getLevel()).toBe(2);
    expect(testMage.getMaxHealth()).toBe(95);
    expect(testMage.getMaxMana()).toBe(27.5);

    const mageToJSON = testMage.toJSON();
    expect(mageToJSON.name).toBe('Default');
    expect(mageToJSON.level).toBe(2);
  })

  test("Test MeleeHero", () => {
    expect(testMelee.getSecondaryWeapon().name).toBe('BigSword');

    testMelee.swapWeapon();
    expect(testMelee.getSecondaryWeapon().name).toBe('Sword');

    testMelee.levelUp();
    expect(testMelee.getLevel()).toBe(2);
    expect(testMelee.getMaxHealth()).toBe(125);

    const meleToJSON = testMelee.toJSON();
    expect(meleToJSON.name).toBe('Default');
    expect(meleToJSON.secondaryWeapon).toBe('Sword');
  })

  test("Test RangeHero", () => {
    expect(testRange.getAmmo()).toBe(5);

    testRange.useAmmo();
    expect(testRange.getAmmo()).toBe(4);

    testRange.levelUp();
    expect(testRange.getLevel()).toBe(2);
    expect(testRange.getMaxHealth()).toBe(80);
    expect(testRange.getAmmo()).toBe(14);

    const mageToJSON = testRange.toJSON();
    expect(mageToJSON.name).toBe('Default');
    expect(mageToJSON.ammo).toBe(14);
  })