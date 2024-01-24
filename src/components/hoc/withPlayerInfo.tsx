import MeleeHero from '../../classes/MeleHero.tsx';
import MageHero from '../../classes/MageHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';
import showPlayer from '../functions/showPlayer.tsx'
import Button from '../button.tsx';

type HeroToJSON = MageHeroJSON | MeleeHeroJSON | RangeHeroJSON;
type HeroSerializer = (hero: any) => HeroInfo;

const heroesSerializersRegister = new Map<HERO_TYPES, HeroSerializer>([
    ["Mage", MageHero.fromJSON],
    ["Melee", MeleeHero.fromJSON],
    ["Range", RangeHero.fromJSON]
]);

export default function withPlayerInfo(WrappedComponent: typeof Button, player: HeroToJSON, index: number) {

    const playerHeroType = player.type as HERO_TYPES;

    const playerInfoSerializer: HeroSerializer | undefined =
        heroesSerializersRegister.get(playerHeroType);

    let playerInfo: HeroInfo ;

    if (playerInfoSerializer) {
        playerInfo = playerInfoSerializer(player);
    }

    const content = (
        <div>
            <div>{playerInfo?.getName()}</div>
            <div>level {playerInfo?.getLevel()} {playerInfo?.getType()}</div>
        </div>
    )

    return <WrappedComponent
        key={index}
        className="playerButton"
        variant="outlined"
        content={content}
        icon={
            <img src={`../../../Picture${playerInfo?.getType()}.svg`}
                alt="icon"
            />
        }
        onClick={() => { showPlayer(playerInfo) }}
    />
}