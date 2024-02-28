import './fightScreen.less';
import FightLogic from './fightLogic.tsx';

interface FightScreenProps {
    levelName: string
}

export default function FightScreen({ levelName }: FightScreenProps) {
    return (
        <>
            <img id='background' src={`../../../public/Picture${levelName}.svg`} alt="" />
            <FightLogic levelName={levelName} />
        </>
    );
}
