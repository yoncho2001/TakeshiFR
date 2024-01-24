import showPlayer from '../functions/showPlayer.tsx'
import fromJSONToHero from '../functions/fromJSONToHero.tsx'
import Button from '../button.tsx';

export default function withPlayerInfo(WrappedComponent: typeof Button, player: HeroToJSON, index: number) {

    let playerInfo = fromJSONToHero(player);
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