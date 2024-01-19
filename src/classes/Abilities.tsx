type HERO_TYPES = 'Melee' | 'Range' | 'Mage';

export default class Ability {
    private name: string;
    private heroClassType: HERO_TYPES[];
    private cooldown: number;
    private cost: number;
    private effect: string;
    private useEffect: () => void;

    constructor(name: string, heroClassType: HERO_TYPES[], cooldown: number, cost: number, effect: string, useEffect: () => void) {
        this.name = name;
        this.heroClassType = heroClassType;
        this.cooldown = cooldown;
        this.cost = cost;
        this.effect = effect;
        this.useEffect = useEffect;
    }

    public getName(): string {
        return this.name;
    }

    public getHeroClassType(): HERO_TYPES[] {
        return this.heroClassType;
    }

    public getCooldown(): number {
        return this.cooldown;
    }

    public getCost(): number {
        return this.cost;
    }

    public getEffect(): string {
        return this.effect;
    }

    public lowerCooldown(): void {
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        }
    }
}