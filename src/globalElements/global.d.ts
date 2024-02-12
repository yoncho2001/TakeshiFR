import MeleeHero from '../classes/MeleeHero.tsx';
import MageHero from '../classes/MageHero.tsx';
import RangeHero from '../classes/RangeHero.tsx';
import Character from '../classes/Character.tsx';
import Villain from '../classes/Villain.tsx';

export { };

declare global {
    type HERO_TYPES = 'Melee' | 'Range' | 'Mage';
    type HeroToJSON = MageHeroJSON | MeleeHeroJSON | RangeHeroJSON;
    type HeroInfo = MeleeHero | MageHero | RangeHero;
    type AllCharacters = HeroInfo | Villain;
    type POTION_FIELDS = 'HealthPoints' | 'Strength' | 'Mana';
    type levelInfo = {
        name: string,
        levelToReech: number
        vilainStats: {health:number,
                    strenght:number,
                    armorr:number}
    }
}