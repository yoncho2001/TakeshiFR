import MeleeHero from '../../classes/MeleHero.tsx';
import MageHero from '../../classes/MageHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';

type HeroSerializer = (hero: any) => HeroInfo;

const heroesSerializersRegister = new Map<HERO_TYPES, HeroSerializer>([
    ["Mage", MageHero.fromJSON],
    ["Melee", MeleeHero.fromJSON],
    ["Range", RangeHero.fromJSON]
]);

export default function fromJSONToHero(player:HeroToJSON):HeroInfo{
    const playerHeroType = player.type as HERO_TYPES;

    const playerInfoSerializer: HeroSerializer | undefined =
        heroesSerializersRegister.get(playerHeroType);

    let playerInfo: HeroInfo;

    if (playerInfoSerializer) {
        playerInfo = playerInfoSerializer(player);
    }

    return playerInfo;
}
