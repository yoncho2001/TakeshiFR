import Button from './components/button.tsx';
import withPlayerInfo from './components/hoc/withPlayerInfo.tsx';
import React from 'react';

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
                    ? <Button key={index} variant='outlined' className='emptyButton' content={'Create new Character'}/>
                    : withPlayerInfo(Button, player, index)
            )}
        </>);
}