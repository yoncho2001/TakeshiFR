import { PLAYERS_KEY } from "../../typesAndConstants/constants";

export default function getStoredPlayers(): { [key: string]: HeroToJSON } {
    let players: { [key: string]: HeroToJSON } = {};
    let storedPlayers = localStorage.getItem(PLAYERS_KEY);

    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    } else {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }

    return players;
}