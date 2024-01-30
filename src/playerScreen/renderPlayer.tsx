import { useContext } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import RenderItems from "./renderItems.tsx";
import Button from '../components/button.tsx';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";
import deleteHero from "../functions/heroFunctions/deleteHero.tsx";
import getStoredPlayers from "../functions/heroFunctions/getStoredPlayers.tsx";

export default function CurrentPlayer() {
    let players: { [key: string]: HeroToJSON } = getStoredPlayers();
    const currentPlayer = useContext(PlayerContext).currentPlayer;
    let player = players[currentPlayer];

    if (!player) {
        return <>
            <div>Loading player data or player not found...</div>
            <Link to='/'><Button variant='outlined' className='emptyButton' content={'go to Heroes'} /></Link>
        </>
    }

    return (
        <>
            <section id='characterInfo'>
                <div id='typeIcon'>
                    <img src={`../../../Picture${player.type}.svg`} alt="icon" />
                </div>
                <div id='inventory'>
                    <div id='statsInfo'>
                        <div id="tytle">
                            <b>{player.name}</b>
                            <b>lv {player.level}  {player.type}</b>
                        </div>
                        <div id='stats'>
                            <LinearProgress className="statProgress" variant="determinate" color="success" value={player.health} />
                            <LinearProgress className="statProgress" variant="determinate" color="error" value={player.armor} />
                            {'mana' in player && <LinearProgress className="statProgress" variant="determinate" value={player.mana} />}
                        </div>
                    </div>
                    <div id='items'>
                        <b>Items</b>
                        <RenderItems player={player} />
                    </div>
                </div>
            </section>
            <section id='navButtons'>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'< Go to Heroes'} /></Link>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Delete'} onClick={() => { deleteHero(players, player.name) }} /></Link>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Next >'} /></Link>
            </section>
        </>
    );
}