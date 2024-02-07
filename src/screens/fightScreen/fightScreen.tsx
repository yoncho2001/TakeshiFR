import './fightScreen.less';
import { useCallback, useContext, useEffect, useState } from 'react';
import PlayerContext from '../../components/PlayerContext.tsx';
import { useNavigate } from 'react-router-dom';
import CharacterManager from '../../functions/characterManager.tsx';
import { villainsRegister } from '../../elementsOfHero/villains.tsx';
import Villain from '../../classes/Villain.tsx';
import FightScene from './fightScene.tsx';
import FightMenu from './fightMenu.tsx';

interface FightScreenProps {
    levelName: string,
}

export default function FightScreen({ levelName }: FightScreenProps) {
    let characterManager = new CharacterManager();
    let navigate = useNavigate();
    const { currentPlayer } = useContext(PlayerContext);
    const [player, setPlayer] = useState<HeroInfo | null>(null);
    const [villain, setVillain] = useState<Villain | null>(null);
    const [turn, setTurn] = useState<number>(0);

    useEffect(() => {
        let players = characterManager.getStoredPlayers();
        let playerJson = players[currentPlayer];
        const villainInfo = villainsRegister.get(levelName);

        if (!playerJson || !villainInfo) {
            navigate('/');
            return;
        }

        const loadedPlayer = characterManager.fromJSONToHero(playerJson);
        setPlayer(loadedPlayer);

        const villain = new Villain(villainInfo.name, villainInfo.level);
        setVillain(villain);

        const rootElement = document.getElementById('root');

        if (rootElement) {
            rootElement.style.backgroundImage = `url(../../../public/Picture${villain.getName()}.svg)`;
        }

        return () => {
            if (rootElement) {
                rootElement.style.backgroundImage = 'none';
            }
        };
    }, []);

    useEffect( () => console.log('updated'), [player, villain])

    const endTurn = (player: any, villain: any) => {
        setTurn(turn + 1);
    }

    if (!player || !villain) {
        return null;
    }

    return (
        <>
            <FightScene player={player} villain={villain} />
            <FightMenu player={player} villain={villain} endTurn={endTurn} setPlayer={setPlayer} setVillain={setVillain} />  
        </>
    );
}