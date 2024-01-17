export default class Ability {
    private name: string;
    private heroClassType: ('Melee' | 'Range' | 'Mage')[];
    private cooldown: number;
    private cost: number;
    private effect: string;
    private useEffect: () => void;

    constructor(name: string, heroClassType: ('Melee' | 'Range' | 'Mage')[], cooldown: number, cost: number, effect: string, useEffect: () => void) {
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

    public getHeroClassType(): ('Melee' | 'Range' | 'Mage')[] {
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