import showPlayer from './showPlayer.tsx'

export default function savePlayer(player: HeroInfo) {
    const playersKey = 'players';
    const playersRaw = localStorage.getItem(playersKey);
    let players = [];

    if (playersRaw !== null) {
        players = JSON.parse(playersRaw);
    }

    const indexToReplace = players.indexOf(null);
    if (indexToReplace !== -1) {
        players[indexToReplace] = player;
        showPlayer(player);
        localStorage.setItem(playersKey, JSON.stringify(players));
    }else{
        window.location.href = '/';
    }
}
