import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import StartScreen from '../screens/startScreen/startScreen.tsx';
import CreateScreen from '../screens/createScreen/createScreen.tsx';
import PlayerScreen from '../screens/playerScreen/playerScreen.tsx';
import LevelsScreen from '../screens/levelsScreen/levelsScreen.tsx';
import FightScreen from '../screens/fightScreen/fightScreen.tsx';

import SketchComponent from '../animation/SketchComponent';

export default function App(){
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [currentLevel, setCurrentLevel] = useState<string>("");

    return (
        <div>
            <h1>Yoncho Takeshi</h1>
            <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
            <Routes>
                <Route path="/" element={ <StartScreen /> }/>
                <Route path="/create" element={ <CreateScreen /> }/>
                <Route path="/player" element={ <PlayerScreen /> }/>
                <Route path="/levels" element={ <LevelsScreen setLevel= {setCurrentLevel} /> }/>
                <Route path="/fight" element={ <FightScreen levelName={currentLevel}/> }/>
            </Routes>
            </PlayerContext.Provider>
        </div>
    )    
}