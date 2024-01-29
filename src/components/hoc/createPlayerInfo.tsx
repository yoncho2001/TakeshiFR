import MageHero from '../../classes/MageHero.tsx';
import MeleeHero from '../../classes/MeleHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';
import savePlayer from '../../functions/heroFunctions/savePlayer.tsx'
import Button from '../button.tsx';
import { defaultHero } from '../../typesAndConstants/constants.tsx'

type DefaultHeroSerializer = (playerName: string) => HeroInfo;
const createHeroMap = new Map<HERO_TYPES, DefaultHeroSerializer>([
    ["Mage", MageHero.DefoultToJSON],
    ["Melee", MeleeHero.DefoultToJSON],
    ["Range", RangeHero.DefoultToJSON]
]);

export default function createPlayer(WrappedComponent: typeof Button, type: HERO_TYPES, playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>, index?: number) {
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
        onClick={() => { createHero(type, playerName, callbackFunction) }}
    />
}

function createHero(type: HERO_TYPES, playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>) {
    let playerNameToSave = playerName;

    const defaultPlayerSerializer: DefaultHeroSerializer | undefined =
        createHeroMap.get(type);

    let playerInfo: HeroToJSON = defaultHero;

    if (defaultPlayerSerializer) {
        if (playerNameToSave == null || playerNameToSave == '') {
            playerNameToSave = 'Default';
        }

        playerInfo = defaultPlayerSerializer(playerNameToSave);
    }

    savePlayer(playerInfo, callbackFunction);
}