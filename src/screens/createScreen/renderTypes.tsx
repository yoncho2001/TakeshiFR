import Button from '../../components/button.tsx';
import createPlayer from '../../components/hoc/createPlayerInfo.tsx';
import { useContext } from 'react';
import PlayerContext from '../../components/PlayerContext.tsx'
import { Link } from "react-router-dom";
import { MELEE_TYPE, MAGE_TYPE, RANGE_TYPE } from '../../globalElements/constants.tsx';

const heroesTypes = [MAGE_TYPE, MELEE_TYPE, RANGE_TYPE];
interface RenderTypesProps {
    playerName: string;
}

export default function RenderTypes({ playerName }: RenderTypesProps) {

    const { setCurrentPlayer } = useContext(PlayerContext);

    if (!setCurrentPlayer) {
        return <div>Error: setCurrentPlayer is not available.</div>;
    }

    return (
        <>
            {
                heroesTypes.map((element, index) => {
                    return <div key={index}>
                        <Link to='/player'>
                            {createPlayer(Button, element as HERO_TYPES, playerName, setCurrentPlayer)}
                        </Link>
                    </div>;
                })
            }
        </>
    );
}