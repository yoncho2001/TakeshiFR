import Character from '../../classes/Character';
import CharacterManager from '../../functions/characterManager';
import './fightScreen.less';
import { LinearProgress } from '@mui/material';

interface FightSceneProps {
    player: HeroInfo,
    villain: Character,
    background?: string,
}

export default function FightScene({ player, villain }: FightSceneProps) {
    const characterManager = new CharacterManager();
    return (
        <div id="scene">
            <div id='statsHero'>
                <div className='stats'>
                    <LinearProgress 
                        className="statProgress" 
                        variant="determinate" 
                        color="success" 
                        value={characterManager.statPercent(player.getMaxHealth(), player.getHealth())} 
                    />
                    <LinearProgress 
                        className="statProgress"
                        variant="determinate" 
                        color="error" 
                        value={characterManager.statPercent(player.getArmor())} 
                    />
                    {'mana' in player && <LinearProgress 
                                            className="statProgress" 
                                            variant="determinate" 
                                            value={characterManager.statPercent(player.getMaxMana(), player.getMana())} 
                                        />
                    }
                </div>
                <img id="heroImg" src={`../../../public/Picture${player.getType()}.svg`} alt="icon" />
            </div>

            <div id='statsVillain' className='stats'>
                <div className='stats'>
                    <LinearProgress 
                       className="statProgress" 
                       variant="determinate" color="success" 
                       value={characterManager.statPercent(villain.getMaxHealth(), villain.getHealth())}
                    />
                    <LinearProgress 
                    className="statProgress" 
                    variant="determinate" 
                    color="error" 
                    value={characterManager.statPercent(player.getArmor())} 
                    />
                </div>
                <img id="villainImg" src={`../../../public/PictureBoss${villain.getName()}.svg`} alt="icon" />
            </div>
        </div>
    );
}