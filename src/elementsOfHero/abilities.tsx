import Ability from '../classes/Abilities.tsx';
import RangeHero from '../classes/RangeHero.tsx';

export const constAbilities = new Map<string, Ability>([
    ["BasicAttack", new Ability("BasicAttack", ["Melee", "Mage","Range"], 0, 0, "Do basic damage.", basicAttack)],
    //["HeavyAttack", new Ability("HeavyAttack", ["Melee", "Mage"], 2, 0, "Do double basic damage.", () => { })],
    //["BasicAttackRange", new Ability("BasicAttackRange", ["Range"], 0, 0, "Do basic damage.", () => { })],
    //["HeavyAttackRange", new Ability("HeavyAttackRange", ["Range"], 2, 0, "Do double basic damage.", () => { })],
    //["Bolt", new Ability("Bolt", ["Mage"], 2, 20, "Do electric damage.", () => { })],
    //["DoubleShot", new Ability("DoubleShot", ["Range"], 2, 0, "Shoot two arrows at once", () => { })],
]);

function basicAttack(player:HeroInfo):number {
    if(player instanceof  RangeHero){
        player.useAmmo();
    }
    return player.getStrength() +  player.getPrimaryWeapon().damage - player.getArmor();
}