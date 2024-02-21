import './playerScreen.less';
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/button.tsx';
import { useCallback, useContext, useEffect } from 'react';
import PlayerContext from '../../components/PlayerContext.tsx';
import RenderItems from "./renderItems.tsx";
import LinearProgress from '../../components/linearProgress.tsx';
import CharacterManager from '../../functions/characterManager.tsx';
import { Tooltip } from '@mui/material';
//import Mage from '../../../public/PictureMelee.svg';

export default function PlayerScreen() {
  let characterManager = new CharacterManager();

  const deleteHero = useCallback(() => { characterManager.deleteHero(players, player.name) }, []);

  let navigate = useNavigate();
  let players: { [key: string]: HeroToJSON } = characterManager.getStoredPlayers();
  const currentPlayer = useContext(PlayerContext).currentPlayer;
  let player = players[currentPlayer];

  useEffect(() => {
    if (!player) {
      navigate('/');
    }
  }, []);

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
            <div id="title">
              <b>{player.name}</b>
              <b>lv {player.level}  {player.type}</b>
            </div>
            <div id='stats'>
              <LinearProgress
                className="linearProgress"
                color="success"
                value={characterManager.statPercent(player.maxHealth)}
                title={player.maxHealth}
              />
              <LinearProgress
                className="linearProgress"
                color="error"
                value={characterManager.statPercent(player.armor)}
                title={player.armor}
              />
              {'maxMana' in player &&
                <LinearProgress
                  className="linearProgress"
                  value={characterManager.statPercent(player.maxMana)}
                  title={player.armor}
                />
              }
            </div>
          </div>
          <div id='items'>
            <b>Items</b>
            <RenderItems player={player} />
          </div>
        </div>
      </section>
      <section id='navButtons'>
        <Link to='/' className="buttonLink">
          <Button variant='outlined' className='emptyButton' content={'< Go to Heroes'} />
        </Link>
        <Link to='/' className="buttonLink">
          <Button variant='outlined' className='emptyButton' content={'Delete'} onClick={deleteHero} />
        </Link>
        <Link to='/levels' className="buttonLink">
          <Button variant='outlined' className='emptyButton' content={'Next >'} />
        </Link>
      </section>
    </>
  );
}