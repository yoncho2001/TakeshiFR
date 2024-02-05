import MageHero from '../../classes/MageHero.tsx';
import MeleeHero from '../../classes/MeleeHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';
import CharacterManager from '../../functions/characterManager.tsx'
import Button from '../button.tsx';
import { defaultHero } from '../../globalElements/constants.tsx'

type DefaultHeroSerializer = (playerName: string) => HeroToJSON;
const createHeroMap = new Map<HERO_TYPES, DefaultHeroSerializer>([
    ["Mage", MageHero.createCharacterJSON ],
    ["Melee", MeleeHero.createCharacterJSON ],
    ["Range", RangeHero.createCharacterJSON ]
]);

export default function createPlayer(WrappedComponent: typeof Button, type: HERO_TYPES, playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<string>>, index?: number) {
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

function createHero(type: HERO_TYPES, playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<string>>) {
    let characterManager = new CharacterManager();
    let playerNameToSave = playerName ? playerName : 'Default';
    const defaultPlayerSerializer: DefaultHeroSerializer | undefined =
        createHeroMap.get(type);

    let playerInfo: HeroToJSON = defaultHero;

    if (defaultPlayerSerializer) {
        playerInfo = defaultPlayerSerializer(playerNameToSave);
    }

    characterManager.savePlayer(playerInfo, callbackFunction);
}