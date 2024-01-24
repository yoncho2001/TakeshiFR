export default function showPlayer(player:HeroInfo) {
    localStorage.setItem('curentPlayer', JSON.stringify(player));
    window.location.href = '/player';
}