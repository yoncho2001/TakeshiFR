import { Routes, Route } from 'react-router-dom';
import StartScreen from '../startScreen/startScreen.tsx';
import CreateScreen from '../createScreen/createScreen.tsx';
import PlayerScreen from '../playerScreen/playerScreen.tsx';

export default function App(){
    return (
        <div>
            <Routes>
                <Route path="/" element={ <StartScreen /> }/>
                <Route path="/create" element={ <CreateScreen /> }/>
                <Route path="/player" element={ <PlayerScreen /> }/>
            </Routes>
        </div>
    )    
}