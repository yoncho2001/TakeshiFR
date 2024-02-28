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

let discoBackgroundColor: number | null = null;

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

    const [discoChek, setDiscoChek] = useState(false);

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
        setVillain(villain);

        const rootElement = document.getElementById('root');
        let styleElement;

        if (rootElement) {
            if (!discoChek) {
                rootElement.style.backgroundImage = `url(../../../public/Picture${villain.getName()}.svg)`;
            }
            else {
                const discoBackground = `discoBackground`;
                rootElement.classList.add(discoBackground);

                const cssString = `
            .${discoBackground}::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('../../../public/Picture${villain.getName()}.svg');
            background-size: cover;
            background-position: center;
            filter: hue-rotate(${Math.floor(Math.random() * 360)}deg);
            z-index: -1;
            }
    
            .${discoBackground} {
            position: relative;
            }`;

                styleElement = document.createElement('style');
                styleElement.setAttribute('class', 'discoBackground');
                styleElement.appendChild(document.createTextNode(cssString));
                rootElement.appendChild(styleElement);
            }
        }

        return () => {
            if (rootElement) {
                rootElement.style.backgroundImage = 'none';
                rootElement.classList.remove('discoBackground');
            }
        };
    }, [discoChek]);

    /*const backgroundElement = document.querySelector('.discoBackground')as HTMLElement;
    if (backgroundElement) {
        discoBackgroundColor = setInterval(() => {
            const hue = Math.floor(Math.random() * 360);
            backgroundElement.style.filter = `hue-rotate(${hue}deg)`
            
        }, 100);
    }*/

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
            <FightScene player={player} villain={villain} discoChek={discoChek} />
            <FightMenu player={player} villain={villain} endTurn={endTurn} turn={turn} setDiscoChek={setDiscoChek} discoChek={discoChek} />
            {isGameOver && <WinScene isWin={isWin} levelName={levelName} />}
        </>
    );
}
