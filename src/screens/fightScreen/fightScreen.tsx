import './fightScreen.less';
import { useContext, useEffect, useState } from 'react';
import PlayerContext from '../../components/PlayerContext.tsx';
import { useNavigate } from 'react-router-dom';
import CharacterManager from '../../functions/characterManager.tsx';
import { villainsRegister } from '../../elementsOfHero/villains.tsx';
import Villain from '../../classes/Villain.tsx';
import FightScene from './fightScene.tsx';
import FightMenu from './fightMenu.tsx';
import FightLogicManager from '../../functions/fightLogicManager.tsx';
import WinScene from './winScene.tsx';

interface FightScreenProps {
    levelName: string
}

export default function FightScreen({ levelName }: FightScreenProps) {
    const logicManager = new FightLogicManager();
    const characterManager = new CharacterManager();
    const navigate = useNavigate();
    const { currentPlayer } = useContext(PlayerContext);
    const [player, setPlayer] = useState<HeroInfo | null>(null);
    const [villain, setVillain] = useState<Villain | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isWin, setisWin] = useState<boolean>(false);
    const [levelCount, setLevelCount] = useState<number>(0);
    const [turn, setTurn] = useState<string>('villain');

    useEffect(() => {
        let players = characterManager.getStoredPlayers();
        let playerJson = players[currentPlayer];
        const villainInfo = villainsRegister.get(levelName);

        if (!playerJson || !villainInfo) {
            navigate('/');
            return;
        }

        const loadedPlayer = characterManager.fromJSONToHero(playerJson);
        logicManager.resetCooldowns(loadedPlayer);
        setPlayer(loadedPlayer);

        const villain = new Villain(villainInfo, loadedPlayer.getLevel());
        console.log(villain.getHealth());
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

    const endTurn = (player: HeroInfo, villain: Villain, endOf: string) => {
        setTurn(endOf);

        if (villain.getHealth() <= 0) {
            setisWin(true);
            setIsGameOver(true);
        }

        if (player.getHealth() <= 0) {
            setisWin(false);
            setIsGameOver(true);
        }
    }

    console.log(turn);

    if (!player || !villain) {
        return null;
    }

    if (isGameOver && isWin && levelCount === 0) {
        player.levelUp();
        characterManager.updatePlayer(player.toJSON());
        setLevelCount(levelCount + 1);
    }

    return (
        <>
            <FightScene player={player} villain={villain} />
            <FightMenu player={player} villain={villain} endTurn={endTurn} turn={turn} />
            {isGameOver && <WinScene isWin={isWin} levelName={levelName} />}
        </>
    );
}
