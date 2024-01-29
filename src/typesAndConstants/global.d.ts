import MeleeHero from '../../classes/MeleHero.tsx';
import MageHero from '../../classes/MageHero.tsx';
import RangeHero from '../../classes/RangeHero.tsx';

export {};

declare global {
    type HERO_TYPES = 'Melee' | 'Range' | 'Mage';
    type HeroToJSON = MageHeroJSON | MeleeHeroJSON | RangeHeroJSON;
    type HeroInfo = MeleeHero | MageHero | RangeHero | null | undefined;
    type POTION_FIELDS = 'HealthPoints' | 'Strength' | 'Mana';    
}

