import './fightScreen.less';
import { useState, useEffect } from 'react';
import Villain from '../../classes/Villain.tsx';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import Button from '../../components/button.tsx';
import Alert from '@mui/material/Alert';
import CharacterManager from '../../functions/characterManager.tsx';
import FightLogicManager from '../../functions/fightLogicManager.tsx';

const healthPotion = 'HealthPotion';
const manaPotion = 'ManaPotion';

interface FightMenuProps {
    player: HeroInfo,
    villain: Villain,
    endTurn: (player: HeroInfo, villain: Villain) => void,
}

export default function FightMenu({ player, villain, endTurn }: FightMenuProps) {
    const logicManager = new FightLogicManager();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAbilities = Boolean(anchorEl?.id === "abilitiesButton");
    const openItems = Boolean(anchorEl?.id === "itemsButton");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '' });

    let characterManager = new CharacterManager();
    let countHealtP = characterManager.countPotions(player.getPotions(), healthPotion);
    let countManaP = characterManager.countPotions(player.getPotions(), manaPotion);

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
                    open={openAbilities}
                    onClose={() => { logicManager.handleClose(setAnchorEl); }}
                >
                    {player.getAbilities().map((ability, index) => (
                        <MenuItem key={index} onClick={() => logicManager.makeDMG(player, villain, ability, setAnchorEl, endTurn, showAlert)}>
                            {`${ability.getName()} ${ability.getCooldownCount()} cool`}
                        </MenuItem>
                    ))}
                </Menu>
                <Menu
                    anchorEl={anchorEl}
                    open={openItems}
                    onClose={() => { logicManager.handleClose(setAnchorEl); }}
                >
                    {countHealtP > 0 &&
                        <MenuItem onClick={() => { logicManager.usePotion(player, healthPotion, villain, setAnchorEl, endTurn, showAlert); }}>{`HealthPotion x${countHealtP}`}</MenuItem>
                    }
                    {countManaP > 0 &&
                        <MenuItem onClick={() => { logicManager.usePotion(player, manaPotion, villain, setAnchorEl, endTurn, showAlert); }}>{`ManaPotion x${countManaP}`}</MenuItem>
                    }
                    {'secondaryWeapon' in player &&
                        <MenuItem onClick={() => { logicManager.swapWeapons(player, villain, setAnchorEl, endTurn, showAlert); }}>{player.getSecondaryWeapon().name}</MenuItem>
                    }
                </Menu>
                <Link to='/levels' className="buttonLink"><Button variant='contained' className='emptyButton' content={'<Flee'} /></Link>
                {alertInfo.show && (
                    <Alert severity="error" id="alert" >
                        {alertInfo.message}
                    </Alert>
                )}
            </section>
        </>
    );
}