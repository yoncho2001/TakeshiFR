type AbilityJSON = {
    name: string,
    heroClassType: HERO_TYPES[],
    cooldown: number,
    cost: number,
    effect: string,
    useEffect: () => void
}
