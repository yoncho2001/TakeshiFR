import MeleeHero from '../classes/MeleeHero.tsx';
import MageHero from '../classes/MageHero.tsx';
import RangeHero from '../classes/RangeHero.tsx';
import Character from '../classes/Character.tsx';

export { };

declare global {
    type HERO_TYPES = 'Melee' | 'Range' | 'Mage';
    type HeroToJSON = MageHeroJSON | MeleeHeroJSON | RangeHeroJSON;
    type HeroInfo = MeleeHero | MageHero | RangeHero | Character;
    type POTION_FIELDS = 'HealthPoints' | 'Strength' | 'Mana';
}

