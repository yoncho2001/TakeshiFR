import './fightScreen.less';
import { useContext, useEffect, useState } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import { Link, useNavigate } from 'react-router-dom';
import CharacterManager from '../functions/characterManager.tsx';
import FightLogick from './fightLogick.tsx';

export default function FightScreen() {
    let characterManager = new CharacterManager();
    let navigate = useNavigate();
    const { currentPlayer } = useContext(PlayerContext);
    const [player, setPlayer] = useState<HeroInfo | null>(null);
    const [health, setHealth] = useState(0);

    useEffect(() => {

        let players: { [key: string]: HeroToJSON } = characterManager.getStoredPlayers();
        let playerJson = players[currentPlayer];

        if (!playerJson) {
            navigate('/');
        } else {
            const loadedPlayer = characterManager.fromJSONToHero(playerJson);
            setPlayer(loadedPlayer);
            setHealth(loadedPlayer.getHealth());
        }

    }, [currentPlayer, navigate]);

    if (!player) {
        return null;
    }

    return (
        <>
            <FightLogick player={player} />
        </>
    );
}
