import { useContext } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import Button from '../components/button.tsx';
import { Link } from "react-router-dom";
import deleteHero from "../functions/heroFunctions/deleteHero.tsx";
import getStoredPlayers from "../functions/heroFunctions/getStoredPlayers.tsx";

export default function CurrentPlayer() {
    let players: { [key: string]: HeroToJSON } = getStoredPlayers();
    const currentPlayer = useContext(PlayerContext).currentPlayer;
    let player = players[currentPlayer];

    let countHealtP = 0;
    let countManaP = 0;

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
                    <div id='stats'>
                        <div id = "tytle">
                            <text>{player.name}</text>
                            <text>lv {player.level}  {player.type}</text>
                        </div>
                        <div>stats</div>
                    </div>
                    <div id='items'>
                        <h2>items</h2>
                        <div id='icon'>
                            <p>{countHealtP}x</p>
                            <img src={`../../../PictureHealthPotion.svg`} alt="icon" id= "imgHealt" />
                            <p>{countManaP}x</p>
                            <img src={`../../../PictureManaPotion.svg`} alt="icon" id= "imgMana"/>
                        </div>
                    </div>
                </div>
            </section>
            <section id='navButtons'>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'< Go to Heroes'} /></Link>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Delete'} onClick={() => {deleteHero(players, player.name)}}/></Link>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Next >'} /></Link>
            </section>
        </>
    );
}