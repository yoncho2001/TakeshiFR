export default class Ability {
    private name: string;
    private heroClassType: HERO_TYPES[];
    private cooldown: number;
    private cooldownCount: number;
    private cost: number;
    private effect: string;
    private useEffect: (hero: HeroInfo) => number;

    constructor(name: string, heroClassType: HERO_TYPES[], cooldown: number, cost: number, effect: string, useEffect: (hero: HeroInfo) => number) {
        this.name = name;
        this.heroClassType = heroClassType;
        this.cooldown = cooldown;
        this.cooldownCount = 0;
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

    public getCooldownCount(): number {
        return this.cooldownCount;
    }

    public getCost(): number {
        return this.cost;
    }

    public getEffect(): string {
        return this.effect;
    }

    public lowerCooldown(): void {
        if (this.cooldownCount > 0) {
            this.cooldownCount -= 1;
        }
    }

    public use(player: HeroInfo): number {
        let type = player.getType();
        let damage = 0;

        if (this.heroClassType.includes(type)) {
            damage = this.useEffect(player);
        }

        return damage;
    }
}
