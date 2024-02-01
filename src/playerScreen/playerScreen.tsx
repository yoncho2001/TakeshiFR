import './playerScreen.less';
import { Link, useNavigate} from "react-router-dom";
import Button from '../components/button.tsx';
import { useContext, useEffect} from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import RenderItems from "./renderItems.tsx";
import LinearProgress from '@mui/material/LinearProgress';
import CharacterManager from '../functions/characterManager.tsx';

export default function PlayerScreen() {
  let characterManager = new CharacterManager();
  let navigate = useNavigate();
  let players: { [key: string]: HeroToJSON } = characterManager.getStoredPlayers();
  const currentPlayer = useContext(PlayerContext).currentPlayer;
  let player = players[currentPlayer];

  useEffect(() => {
    if (!player) {
      navigate('/');
    }
  }, [player, navigate]);

  if (!player) {
    return null;
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
        <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Delete'} onClick={() => { characterManager.deleteHero(players, player.name) }} /></Link>
        <Link to='/levels' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'Next >'} /></Link>
      </section>
    </>
  );
}