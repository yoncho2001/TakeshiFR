import './fightScreen.less';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import Button from '../components/button.tsx';

interface FightLogickProps {
    player:HeroInfo
}

export default function FightLogick({player}:FightLogickProps) {

    const [health, setHealth] = useState(player.getHealth());

    function makeDMG(player: HeroInfo) {
        player.takeDamage(player.getAbilities()[0].use(player));
        setHealth(player.getHealth())
    }

    return (
        <>
            <div id='stats'>
                <LinearProgress className="statProgress" variant="determinate" color="success" value={health} />
                <LinearProgress className="statProgress" variant="determinate" color="error" value={player.getArmor()} />
                {'mana' in player && <LinearProgress className="statProgress" variant="determinate" value={player.getMana()} />}
            </div>
            <section id='navButtons'>
                <Link to='/' className="buttonLink"><Button variant='outlined' className='emptyButton' content={'< Go to Heroes'} /></Link>
                <Button variant='outlined' className='emptyButton' content={'make dmg'} onClick={() => { makeDMG(player)} }/>
            </section>
        </>
    );
}
