import { PLAYERS_KEY } from "../../typesAndConstants/constants";

export default function deleteHero(players: { [key: string]: HeroToJSON }, player: string) {
    delete players[player];
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}