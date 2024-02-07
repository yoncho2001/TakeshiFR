import './fightScreen.less';
import Character from '../../classes/Character.tsx';
import Ability from '../../classes/Abilities.tsx';
import MageHero from '../../classes/MageHero.tsx';
import Villain from '../../classes/Villain.tsx';


export function handleClick(event: React.MouseEvent<HTMLButtonElement>, callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>) {
    callbackFunction(event.currentTarget);
};

export function handleClose(callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>) {
    callbackFunction(null);
};

//Make DMG should be more generic 
export function makeDMG(player: HeroInfo,
    villain:Character,
    ability:Ability,
    callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    setPlayer:React.Dispatch<React.SetStateAction<HeroInfo|null>>,
    setVillain: React.Dispatch<React.SetStateAction<Villain|null>>,
    endTurn: any)
{
    const dmg = ability.use(player);
    villain.takeDamage(dmg);

    if (player instanceof  MageHero) {
        player.takeMana(ability.getCost())
    }

    // setPlayer(player);
    // setVillain(villain);

    if (villain.getHealth() <= 0 || player.getHealth() <= 0) {
        endTurn(player, villain);
    } else {
        villainTurn(player,villain);
        endTurn(player, villain);
    }

    // setPlayer(player);
    handleClose(callbackFunction);
}

export function selectRandomAbility(abilities: Ability[]): Ability | null {
    if (abilities.length === 0) return null;
  
    let totalWeight = 0;
    for (let i = 0; i < abilities.length; i++) {
      totalWeight += Math.pow(2, -i);
    }
  
    let randomChance = Math.random() * totalWeight;
    let cumulativeWeight = 0;
  
    for (let i = 0; i < abilities.length; i++) {
      cumulativeWeight += Math.pow(2, -i);

      if (randomChance <= cumulativeWeight) {
        return abilities[i];
      }
    }
  
    return abilities[abilities.length - 1];
  }
  
  function villainTurn(player: HeroInfo, villain: Villain) {
    const abilities = villain.getAbilities();
    const selectedAbility = selectRandomAbility(abilities);

    if (selectedAbility) {
        const dmg = selectedAbility.use(villain);
        console.log(dmg);
        player.takeDamage(dmg);
    }
  }