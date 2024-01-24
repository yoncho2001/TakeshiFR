export default function showPlayer(player:HeroInfo) {
    localStorage.setItem('currentPlayer', JSON.stringify(player));
    window.location.href = '/player';
}