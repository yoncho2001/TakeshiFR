import MeleeHero from '../../classes/MeleHero.tsx';
import MageHero from '../../classes/MageHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';
import savePlayer from '../functions/savePlayer.tsx'
import Button from '../button.tsx';

type DefaultHeroSerializer = (playerName: string) => HeroInfo;

const defaultHeroesRegister = new Map<HERO_TYPES, DefaultHeroSerializer>([
    ["Mage", MageHero.toDefault],
    ["Melee", MeleeHero.toDefault],
    ["Range", RangeHero.toDefault]
]);

function createHero(type: HERO_TYPES, playerName: string) {
    let playerNameToSave = playerName;

    const defaultPlayerSerializer: DefaultHeroSerializer | undefined =
        defaultHeroesRegister.get(type);

    let playerInfo: HeroInfo;
   
    if (defaultPlayerSerializer) {
        if (playerNameToSave == null || playerNameToSave == '' ) {
            playerNameToSave = 'Default';
        }

        playerInfo = defaultPlayerSerializer(playerNameToSave);
    }
 
    savePlayer(playerInfo);
}

export default function createPlayer(WrappedComponent: typeof Button, type: HERO_TYPES, playerName: string, index?: number) {
    const content = (
        <div>{type}</div>
    )

    return <WrappedComponent
        key={index}
        className="playerType"
        variant="text"
        content={content}
        icon={
            <img src={`../../../Picture${type}.svg`}
                alt="icon"
            />
        }
        onClick={() => { createHero(type, playerName) }}
    />
}
