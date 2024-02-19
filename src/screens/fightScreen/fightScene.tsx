import Character from '../../classes/Character';
import CharacterManager from '../../functions/characterManager';
import './fightScreen.less';
import { LinearProgress, Tooltip } from '@mui/material';

interface FightSceneProps {
    player: HeroInfo,
    villain: Character,
    background?: string,
}

export default function FightScene({ player, villain }: FightSceneProps) {
    const characterManager = new CharacterManager();
    const villainTempHealth = characterManager.statPercent(villain.getMaxHealth(), villain.getHealth());
    const villainTempArmor = characterManager.statPercent(villain.getArmor());

    const playerTempHealth = characterManager.statPercent(player.getMaxHealth(), player.getHealth());
    const playerTempArmor = characterManager.statPercent(player.getArmor());
    const playerTempMana = 'mana' in player ? characterManager.statPercent(player.getMaxMana(), player.getMana()) : 0;

    return (
        <div id="scene">
            <div id='statsHero'>
                <div className='stats'>
                    <Tooltip className="tooltip" title={player.getHealth()} placement="right">
                        <LinearProgress
                            className="statProgress"
                            variant="determinate"
                            color="success"
                            value={playerTempHealth}
                        />
                    </Tooltip>
                    <Tooltip className="tooltip" title={player.getArmor()} placement="right">
                        <LinearProgress
                            className="statProgress"
                            variant="determinate"
                            color="error"
                            value={playerTempArmor}
                        />
                    </Tooltip>
                    {'mana' in player &&
                        <Tooltip className="tooltip" title={player.getMana()} placement="right">
                            <LinearProgress
                                className="statProgress"
                                variant="determinate"
                                value={playerTempMana}
                            />
                        </Tooltip>
                    }
                </div>
                <img id="heroImg" src={`../../../public/Picture${player.getType()}.svg`} alt="icon" />
            </div>

            <div id='statsVillain' className='stats'>
                <div className='stats'>
                    <Tooltip className="tooltip" title={villainTempHealth} placement="right">
                        <LinearProgress
                            className="statProgress"
                            variant="determinate" color="success"
                            value={villainTempHealth}
                        />
                    </Tooltip>
                    <Tooltip className="tooltip" title={villainTempArmor} placement="right">
                        <LinearProgress
                            className="statProgress"
                            variant="determinate"
                            color="error"
                            value={villainTempArmor}
                        />
                    </Tooltip>
                </div>
                <img id="villainImg" src={`../../../public/PictureBoss${villain.getName()}.svg`} alt="icon" />
            </div>
        </div>
    );
}