import Button from '../components/button.tsx';
import withPlayerInfo from '../components/hoc/withPlayerInfo.tsx';
import { useContext } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import { Link } from "react-router-dom";
import { PLAYER_COUNT_LIMIT } from "../globalElements/constants.tsx";
import CharacterManager from '../functions/characterManager.tsx';

function shouldRenderCreateButton(characterLength: number) {
    return PLAYER_COUNT_LIMIT - characterLength > 0;
}

export default function Players() {
    let characterManager = new CharacterManager();
    const { setCurrentPlayer } = useContext(PlayerContext);

    let players: { [key: string]: HeroToJSON } = characterManager.getStoredPlayers();

    const characterLength = Object.keys(players).length;

    if (!setCurrentPlayer) {
        return <div>Error: setCurrentPlayer is not available.</div>;
    }

    return (
        <>
            {Object.values<HeroToJSON>(players).map((hero) => {
                return <div key={hero.name}>
                    <Link to='/player' >
                        {withPlayerInfo(Button, hero, hero.name, setCurrentPlayer)}
                    </Link>
                </div>;
            })}
            {shouldRenderCreateButton(characterLength) && <Link to='/create' ><Button variant='outlined' className='emptyButton' content={'Create new Character'} /></Link>}
        </>
    );
}