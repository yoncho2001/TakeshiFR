import Button from '../components/button.tsx';
import createPlayer from '../components/hoc/createPlayerInfo.tsx';
import MeleeHero from '../classes/MeleHero.tsx';
import MageHero from '../classes/MageHero.tsx';
import RangeHero from '../classes/MeleHero.tsx';

type HeroInfo = MeleeHero | MageHero | RangeHero | null | undefined;
type HeroSerializer = (hero: any) => HeroInfo;

const heroesSerializersRegister = new Map<HERO_TYPES, HeroSerializer>([
    ["Mage", MageHero.fromJSON],
    ["Melee", MeleeHero.fromJSON],
    ["Range", RangeHero.fromJSON],
]);   

export default function RenderTypes() {
    return (
        <>
            {
                [...heroesSerializersRegister.keys()].map((element, index) => {
                    return <div key={index}>{createPlayer(Button, element)}</div>;
                })
            }
        </>);
}