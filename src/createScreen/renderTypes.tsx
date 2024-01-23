import Button from '../components/button.tsx';
import createPlayer from '../components/hoc/createPlayerInfo.tsx';

const heroesTypes = ["Mage","Melee","Range"];   

export default function RenderTypes() {
    return (
        <>
            {
                heroesTypes.map((element, index) => {
                    return <div key={index}>{createPlayer(Button, element)}</div>;
                })
            }
        </>);
}