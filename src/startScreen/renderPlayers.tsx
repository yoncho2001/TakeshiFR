import Button from '../components/button.tsx';
import withPlayerInfo from '../components/hoc/withPlayerInfo.tsx';

export default function Players() {

    let players = [null, null, null];
    let storedPlayers = localStorage.getItem('players');

    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    } else {
        localStorage.setItem('players', JSON.stringify(players));
    }

    return (
        <>
            {players.map((player, index) =>
                player === null
                    ? <Button key={index} variant='outlined' className='emptyButton' herf={'/create'} content={'Create new Character'} onClick={() => { }} />
                    : withPlayerInfo(Button, player, index)
            )}
        </>
    );
}