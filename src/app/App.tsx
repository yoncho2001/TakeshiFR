import { Routes, Route } from 'react-router-dom';
import StartScreen from '../startScreen/startScreen.tsx';
import CreateScreen from '../createScreen/createScreen.tsx';
import PlayerScreen from '../playerScreen/playerScreen.tsx';
import { useState } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';

export default function App(){
    const [currentPlayer, setCurrentPlayer] = useState<HeroInfo| null>("opa");
    console.log(currentPlayer);

    return (
        <div>
            <h1>Yoncho Takeshi</h1>
            <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
            <Routes>
                <Route path="/" element={ <StartScreen /> }/>
                <Route path="/create" element={ <CreateScreen /> }/>
                <Route path="/player" element={ <PlayerScreen /> }/>
            </Routes>
            </PlayerContext.Provider>
        </div>
    )    
}