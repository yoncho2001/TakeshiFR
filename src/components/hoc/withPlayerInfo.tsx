import { saveCurrentPlayer } from '../../functions/heroFunctions/savePlayer.tsx';
import Button from '../button.tsx';

export default function withPlayerInfo(WrappedComponent: typeof Button, player: HeroToJSON, index: string, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>) {
    const content = (
        <div>
            <div>{player.name}</div>
            <div>level {player.level} {player.type}</div>
        </div>
    )

    return <WrappedComponent
        key={index}
        className="playerButton"
        variant="outlined"
        content={content}
        icon={
            <img src={`../../../Picture${player.type}.svg`}
                alt="icon"
            />
        }
        onClick={() => { saveCurrentPlayer(player.name, callbackFunction) }}
    />
}