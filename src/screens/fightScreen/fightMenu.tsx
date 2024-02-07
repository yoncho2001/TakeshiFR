import './fightScreen.less';
import { useState } from 'react';
import Villain from '../../classes/Villain.tsx';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import Button from '../../components/button.tsx';
import { handleClick, handleClose ,makeDMG} from './fightLogic.tsx';

interface FightMenuProps {
    player:HeroInfo,
    villain:Villain,
    endTurn: any,
    setPlayer:React.Dispatch<React.SetStateAction<HeroInfo|null>>,
    setVillain: React.Dispatch<React.SetStateAction<Villain|null>>

}

export default function FightMenu({ player, villain, setPlayer, setVillain, endTurn }: FightMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAbilities = Boolean(anchorEl?.id === "abilitiesButton");
    const openItems = Boolean(anchorEl?.id === "itemsButton")

    return (
        <>
            <section id='navButtons'>
                <Button
                    id="abilitiesButton"
                    content={'Abilities'}
                    onClick={(event) => { handleClick(event, setAnchorEl) }}
                >
                </Button>
                <Button
                    id="itemsButton"
                    content={'Items'}
                    onClick={(event) => { handleClick(event, setAnchorEl) }}
                ></Button>
                <Menu
                    anchorEl={anchorEl}
                    open={openAbilities}
                    onClose={() => { handleClose(setAnchorEl); }}
                >
                    {player.getAbilities().map((ability, index) => (
                        <MenuItem key={index} onClick={() => makeDMG(player, villain, ability, setAnchorEl, setPlayer, setVillain, endTurn)}>
                            {ability.getName()}
                        </MenuItem>
                    ))}                
                </Menu>
                <Menu
                    anchorEl={anchorEl}
                    open={openItems}
                    onClose={() => { handleClose(setAnchorEl); }}
                >
                    <MenuItem onClick={() => { handleClose(setAnchorEl); }}>VL</MenuItem>
                    <MenuItem onClick={() => { handleClose(setAnchorEl); }}>p</MenuItem>
                </Menu>
                <Link to='/levels' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'<Flee'} /></Link>
            </section>
        </>
    );
}