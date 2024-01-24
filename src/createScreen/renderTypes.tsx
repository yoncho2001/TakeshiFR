import Button from '../components/button.tsx';
import createPlayer from '../components/hoc/createPlayerInfo.tsx';

const heroesTypes = ["Mage","Melee","Range"];   
interface RenderTypesProps {
    playerName: string;
}

export default function RenderTypes({ playerName }:RenderTypesProps) {
    return (
        <>
            {
                heroesTypes.map((element, index) => {
                    return <div key={index}>{createPlayer(Button, element as HERO_TYPES, playerName)}</div>;
                })
            }
        </>);
}