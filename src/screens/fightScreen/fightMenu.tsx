import './fightScreen.less';
import { useState, useEffect } from 'react';
import Villain from '../../classes/Villain.tsx';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import Button from '../../components/button.tsx';
import Alert from '@mui/material/Alert';
import CharacterManager from '../../functions/characterManager.tsx';
import FightLogicManager from '../../functions/fightLogicManager.tsx';
import { HEALTH_POTION, MANA_POTION } from '../../globalElements/constants.tsx';
import SketchComponent from '../../animation/SketchComponent.tsx';

interface FightMenuProps {
    player: HeroInfo,
    villain: Villain,
    endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
}

export default function FightMenu({ player, villain, endTurn }: FightMenuProps) {
    const logicManager = new FightLogicManager();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAbilities = Boolean(anchorEl?.id === "abilitiesButton");
    const openItems = Boolean(anchorEl?.id === "itemsButton");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '' });
    const [showSketch, setShowSketch] = useState(false);
    const [isVilain, setIsVilain] = useState(false);
    const [abilityImg, setAbilityImg] = useState('Arrow');

    let characterManager = new CharacterManager();
    let countHealtP = characterManager.countPotions(player.getPotions(), HEALTH_POTION);
    let countManaP = characterManager.countPotions(player.getPotions(), MANA_POTION);

    useEffect(() => {

        if (alertInfo.show) {
            const timer = setTimeout(() => {
                setAlertInfo({ ...alertInfo, show: false });
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    const showAlert = (message: string) => {
        setAlertInfo({ show: true, message });
    };

    const handleShowSketch = (abilityImg: string, isVilain:boolean) => {
        setAbilityImg(abilityImg);
        setShowSketch(true);
        setIsVilain(isVilain);
        setTimeout(() => {
            setShowSketch(false);
        }, 1200);
    };

    return (
        <>
            <section id='navButtons'>
                <Button
                    variant='contained'
                    id="abilitiesButton"
                    className='emptyButton'
                    content={'Abilities'}
                    onClick={(event) => { logicManager.handleClick(event, setAnchorEl) }}
                >
                </Button>
                <Button
                    variant='contained'
                    id="itemsButton"
                    className='emptyButton'
                    content={'Items'}
                    onClick={(event) => { logicManager.handleClick(event, setAnchorEl) }}
                ></Button>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={openAbilities}
                    onClose={() => { logicManager.handleClose(setAnchorEl); }}
                >
                    {player.getAbilities().map((ability, index) => (
                        <MenuItem
                            key={ability.getName() + index}
                            className='menuItem'
                            disabled={ability.getCooldownCount() > 0}
                            onClick={() => logicManager.makeDMG(player, villain, ability, setAnchorEl, endTurn, showAlert, handleShowSketch)}
                        >
                            {`${ability.getName()} ${ability.getCooldownCount() > 0 ? ability.getCooldownCount() + "cool" : ""}`}
                        </MenuItem>
                    ))}
                </Menu>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={openItems}
                    onClose={() => { logicManager.handleClose(setAnchorEl); }}
                >
                    {countHealtP > 0 &&
                        <MenuItem onClick={() => { logicManager.usePotion(player, HEALTH_POTION, villain, setAnchorEl, endTurn, handleShowSketch); }}>{`HealthPotion x${countHealtP}`}</MenuItem>
                    }
                    {countManaP > 0 &&
                        <MenuItem onClick={() => { logicManager.usePotion(player, MANA_POTION, villain, setAnchorEl, endTurn, handleShowSketch); }}>{`ManaPotion x${countManaP}`}</MenuItem>
                    }
                    {'secondaryWeapon' in player &&
                        <MenuItem onClick={() => { logicManager.swapWeapons(player, villain, setAnchorEl, endTurn, handleShowSketch); }}>{player.getSecondaryWeapon().name}</MenuItem>
                    }
                </Menu>

                <Link to='/levels' className="buttonLink"><Button variant='contained' className='emptyButton' content={'<Flee'} /></Link>
                {showSketch && <SketchComponent abilityImgRaw={`../../../public/Picture${abilityImg}.svg`} showSketch={showSketch} isVilain={isVilain} />}
                {alertInfo.show && (
                    <Alert severity="error" id="alert" >
                        {alertInfo.message}
                    </Alert>
                )}
            </section>
        </>
    );
}