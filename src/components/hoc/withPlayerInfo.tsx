import MeleeHero from '../../classes/MeleHero.tsx';
import MageHero from '../../classes/MageHero.tsx';
import Button from '../button.tsx';
import React, { useEffect } from 'react';

type HeroInfo = MeleeHero | MageHero | null | undefined;
type HeroSerializer = (hero: any) => HeroInfo;

const heroesSerializersRegister = new Map<HERO_TYPES, HeroSerializer>([
    ["Mage", MageHero.fromJSON],
    ["Melee", MeleeHero.fromJSON]
]);


export default function withPlayerInfo(WrappedComponent: typeof Button, player: any, index: number) {

    const playerHeroType = player.type as HERO_TYPES;

    const playerInfoSerializer: HeroSerializer | undefined =
        heroesSerializersRegister.get(playerHeroType);

    let playerInfo: HeroInfo = MageHero.fromJSON(player);

    if (playerInfoSerializer) {
        playerInfo = playerInfoSerializer(player);
    }
    
    const content = (
        <div>
            <div>{playerInfo?.getName()}</div>
            <div>level {playerInfo?.getLevel()} {playerInfo?.getType()}</div>
        </div>
    )

    return <WrappedComponent
        key={index}
        className="playerButton"
        variant="outlined"
        content={content}
        icon={
            <img src={`../../../Picture${playerInfo?.getType()}.svg`}
                alt="icon"
            />}
    />
}