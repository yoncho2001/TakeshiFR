import { Routes, Route } from 'react-router-dom';
import StartScreen from '../startScreen/startScreen.tsx';
import CreateScreen from '../createScreen/createScreen.tsx';

export default function App(){
    return (
        <div>
            <Routes>
                <Route path="/" element={ <StartScreen /> }/>
                <Route path="/player" element={ <CreateScreen /> }/>
            </Routes>
        </div>
    )    
}