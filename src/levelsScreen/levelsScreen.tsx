import './levelsScreen.less';
import Button from '../components/button.tsx';
import LevelLink from '../components/levelLink.tsx';
import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import PlayerContext from '../components/PlayerContext.tsx';
import { useNavigate } from 'react-router-dom';
import CharacterManager from '../functions/characterManager.tsx';

export default function LevelsScreen() {
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
            <h2>Chose level</h2>
            <div className="levelsStack" >
                <LevelLink className= "levelLink" to='/' level={player.level} levelToReach={1}>
                    <img className='levelImg' src={`../../../PictureDesertDead.svg`} alt="icon" />
                </LevelLink>
                <LevelLink className= "levelLink" to='/' level={player.level} levelToReach={1}>
                    <img className='levelImg' src={`../../../PictureMountainGiant.svg`} alt="icon" />
                </LevelLink>
                <LevelLink className= "levelLink" to='/' level={player.level} levelToReach={3}>
                    <img className='levelImg' src={`../../../PictureDiscoCrawler.svg`} alt="icon" />
                </LevelLink>
                <LevelLink className= "levelLink" to="/" level={player.level} levelToReach={5}>
                    <img className="levelImg" src={`../../../PictureCastleJuggerknight.svg`} alt="icon" />
                </LevelLink>
            </div>
            <Link to='/' >
                <Button variant='outlined' className='emptyButton' content={"Go back to players"} />
            </Link>
        </>
    );
}
