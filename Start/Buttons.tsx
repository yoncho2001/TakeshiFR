import Button from '@mui/material/Button';
import React from 'react';

function EmptyButton() {
    return (
        <Button variant="outlined" className="emptyButton">
            <div>Create new Character</div>
        </Button>
    );
}

function PlayerButton (){
    return (
        <>
          <h1>Hero</h1>l
        </>
      );
}

export default function Players (){
    let players = [null, null, null];

    let  storedPlayers = localStorage.getItem('players');

    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    } 
    else {
        localStorage.setItem('players', JSON.stringify(players));
    }

    return (
        <>
            {players.map((player, index) => 
                player === null ? 
                <EmptyButton key={index} /> : 
                <PlayerButton key={index}/>
            )}
        </>);
    }