import { Routes, Route } from 'react-router-dom';
import StartScreen from '../startScreen/startScreen.tsx';
import PlayerScreen from '../playerScreen/playerScreen.tsx';

export default function App(){
    return (
        <div>
            <Routes>
                <Route path="/" element={ <StartScreen /> }/>
                <Route path="/player" element={ <PlayerScreen /> }/>
            </Routes>
        </div>
    )    
}