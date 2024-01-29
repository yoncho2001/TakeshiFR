import { PLAYER_COUNT_LIMIT, PLAYERS_KEY } from '../../typesAndConstants/constants.tsx'
import * as React from "react";

export default function savePlayer(player: HeroToJSON, callbackFunction:React.Dispatch<React.SetStateAction<HeroInfo>>) {
    const playersRaw = localStorage.getItem(PLAYERS_KEY);
    let players:{ [key: string]: HeroToJSON } = {};

    if (playersRaw !== null) {
        players = JSON.parse(playersRaw);
    }

    const heroCount = Object.keys(players).length;

    if (heroCount<PLAYER_COUNT_LIMIT) {
        players[player.name] = player;
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
        saveCurrentPlayer(player.name,callbackFunction);
        console.log(localStorage.getItem(PLAYERS_KEY));
    }
    
}

export function saveCurrentPlayer(playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>) {
    callbackFunction(playerName);
}