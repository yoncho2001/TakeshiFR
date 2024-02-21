import Character from '../../classes/Character';
import CharacterManager from '../../functions/characterManager';
import './fightScreen.less';
import LinearProgress from '../../components/linearProgress.tsx';

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
                    <LinearProgress
                        className="linearProgress"
                        color="success"
                        value={playerTempHealth}
                        title={player.getHealth()}
                    />
                    <LinearProgress
                        className="linearProgress"
                        color="error"
                        value={playerTempArmor}
                        title={player.getArmor()}
                    />
                    {'mana' in player &&
                        <LinearProgress
                            className="linearProgress"
                            value={playerTempMana}
                            title={player.getMana()}
                        />
                    }
                </div>
                <img id="heroImg" src={`../../../public/Picture${player.getType()}.svg`} alt="icon" />
            </div>

            <div id='statsVillain'>
                <div className='stats'>
                    <LinearProgress
                        className="linearProgressVilain"
                        color="success"
                        value={villainTempHealth}
                        title={villain.getHealth()}
                    />
                    <LinearProgress
                        className="linearProgressVilain"
                        color="error"
                        value={villainTempArmor}
                        title={villain.getArmor()}
                    />
                </div>
                <img id="villainImg" src={`../../../public/PictureBoss${villain.getName()}.svg`} alt="icon" />
            </div>
        </div>
    );
}