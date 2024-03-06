import './fightScreen.less';
import { useState, useEffect } from 'react';
import Villain from '../../classes/Villain.tsx';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel, Menu, MenuItem, Tooltip } from '@mui/material';
import Button from '../../components/button.tsx';
import Alert from '@mui/material/Alert';
import CharacterManager from '../../functions/characterManager.tsx';
import FightLogicManager from '../../functions/fightLogicManager.tsx';
import { DISCO_BOSS, HEALTH_POTION, MANA_POTION, discoBackground, discoColor } from '../../globalElements/constants.tsx';
import SketchComponent from '../../animation/SketchComponent.tsx';
import { startDiscoBackground, startDiscoColor, stopDiscoBackground, stopDiscoColor } from '../../functions/discoMode.tsx';

interface FightMenuProps {
    player: HeroInfo,
    villain: Villain,
    endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
    turn: string,
    setDiscoChek: React.Dispatch<React.SetStateAction<boolean>>,
    discoChek: boolean
}

export default function FightMenu({ player, villain, endTurn, turn, setDiscoChek, discoChek }: FightMenuProps) {
    const logicManager = new FightLogicManager();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAbilities = Boolean(anchorEl?.id === "abilitiesButton");
    const openItems = Boolean(anchorEl?.id === "itemsButton");
    const [alertInfo, setAlertInfo] = useState({ show: false, message: '' });
    const [showSketch, setShowSketch] = useState(false);
    const [isVillain, setIsVillain] = useState(false);
    const [abilityImg, setAbilityImg] = useState('Arrow');

    let characterManager = new CharacterManager();
    let countHealtP = characterManager.countPotions(player.getPotions(), HEALTH_POTION);
    let countManaP = characterManager.countPotions(player.getPotions(), MANA_POTION);

    useEffect(() => {
        if (alertInfo.show) {
            const timer = setTimeout(() => {
                setAlertInfo({ ...alertInfo, show: false });
            }, 2700);

            return () => clearTimeout(timer);
        }
    }, [alertInfo]);

    const showAlert = (message: string) => {
        setAlertInfo({ show: true, message });
    };

    const handleShowSketch = (abilityImg: string, isVillain: boolean) => {
        setAbilityImg(abilityImg);
        setShowSketch(true);
        setIsVillain(isVillain);
        setTimeout(() => {
            setShowSketch(false);
        }, 1400);
    };

    const checkDisco = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscoChek(event.target.checked);
        if (event.target.checked) {
            startDiscoColor();
            startDiscoBackground();
        } else {
            stopDiscoColor();
            stopDiscoBackground();
        }
    };

    return (
        <>
            <section id='navButtons'>
                <Button
                    variant='contained'
                    id="abilitiesButton"
                    className={'emptyButton ' + discoBackground}
                    content={'Abilities'}
                    onClick={(event) => { logicManager.handleClick(event, setAnchorEl) }}
                >
                </Button>
                <Button
                    variant='contained'
                    id="itemsButton"
                    className={'emptyButton ' + discoBackground}
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
                        <Tooltip key={ability.getName() + index + "tooltip"} title={ability.getEffect()} placement="right">
                            <MenuItem
                                key={ability.getName() + index}
                                className='menuItem'
                                disabled={ability.getCooldownCount() > 0 || turn !== 'villain'}
                                onClick={() => logicManager.makeDMG(player, villain, ability, setAnchorEl, endTurn, showAlert, handleShowSketch)}
                            >
                                <div className='abilityWrap'>
                                    <b>{`${ability.getName()}`}</b>
                                    <small className='smallText'>
                                        {` ${ability.getCooldownCount() > 0 ? ability.getCooldownCount() + "cooldown"
                                            : ` ${ability.getCooldown() > 0 ? ability.getCooldown() + "cooldown" : ""}`
                                            + ` ${ability.getCost() > 0 ? ability.getCost() + " mana" : ""}`}`}
                                    </small>
                                </div>
                            </MenuItem>
                        </Tooltip>
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
                        <MenuItem
                            disabled={turn !== 'villain'}
                            onClick={() => { logicManager.usePotion(player, HEALTH_POTION, villain, setAnchorEl, endTurn, handleShowSketch); }}
                        >
                            {`HealthPotion x${countHealtP}`}
                        </MenuItem>
                    }
                    {countManaP > 0 &&
                        <MenuItem
                            disabled={turn !== 'villain'}
                            onClick={() => { logicManager.usePotion(player, MANA_POTION, villain, setAnchorEl, endTurn, handleShowSketch); }}
                        >
                            {`ManaPotion x${countManaP}`}
                        </MenuItem>
                    }
                    {'secondaryWeapon' in player &&
                        <MenuItem
                            disabled={turn !== 'villain'}
                            onClick={() => { logicManager.swapWeapons(player, villain, setAnchorEl, endTurn, handleShowSketch); }}
                        >
                            {player.getSecondaryWeapon().name}
                        </MenuItem>
                    }
                </Menu>
                <Link to='/levels' className="buttonLink">
                    <Button onClick={()=>{stopDiscoColor()}} variant='contained' className={'emptyButton ' + discoBackground} content={'<Flee'} />
                </Link>
                {DISCO_BOSS == villain.getName() &&
                    <FormControlLabel
                        value="bottom"
                        className={'discoChek ' + discoColor}
                        control={<Checkbox
                            onChange={checkDisco}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}
                        label="Disko Mode"
                        labelPlacement="bottom"
                    />
                }
                {showSketch && <SketchComponent abilityImgRaw={`../../../Picture${abilityImg}${discoChek ? 'Disco' : ''}.svg`} showSketch={showSketch} isVillain={isVillain} />}
                {alertInfo.show && (
                    <Alert severity="error" id="alert" >
                        {alertInfo.message}
                    </Alert>
                )}
            </section>
        </>
    );
}