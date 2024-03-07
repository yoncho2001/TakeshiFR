import { MAGE_TYPE, MELEE_TYPE, PLAYER_COUNT_LIMIT, PLAYERS_KEY, RANGE_TYPE } from '../globalElements/constants.tsx'
import { constWeapons } from "../elementsOfHero/weapons";
import * as React from "react";

import MeleeHero from '../classes/MeleeHero.tsx';
import MageHero from '../classes/MageHero.tsx';
import RangeHero from '../classes/RangeHero.tsx';
type HeroSerializer = (hero: any) => HeroInfo;
const heroesSerializersRegister = new Map<HERO_TYPES, HeroSerializer>([
    [MAGE_TYPE, MageHero.fromJSON],
    [MELEE_TYPE, MeleeHero.fromJSON],
    [RANGE_TYPE, RangeHero.fromJSON]
]);

const defaultHeroClass: MageHero = new MageHero(
    "Default",
    5, 5, 5, [], [],
    {
        name: "Staf",
        damage: 10,
        heroClassType: "Mage"
    }, 20, 1
);

export default class CharacterManager {
    private updateRawPlayer(players: { [key: string]: HeroToJSON }) {
        console.log(players);
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }

    private getRawPlayer() {
        return localStorage.getItem(PLAYERS_KEY);
    }

    public updatePlayer(player: HeroToJSON): number {
        const playersRaw = this.getRawPlayer();
        let players: { [key: string]: HeroToJSON } = {};

        if (playersRaw) {
            players = JSON.parse(playersRaw);
        }

        const heroCount = Object.keys(players).length;

        if (heroCount <= PLAYER_COUNT_LIMIT) {
            players[player.name] = player;
            console.log(player);
            this.updateRawPlayer(players);
        }

        return heroCount;
    }

    public savePlayer(player: HeroToJSON, callbackFunction: React.Dispatch<React.SetStateAction<string>>) {
        let heroCount = this.updatePlayer(player);
        if (heroCount <= PLAYER_COUNT_LIMIT) {
            this.saveCurrentPlayer(player.name, callbackFunction);
        }
    }

    public saveCurrentPlayer(playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<string>>) {
        callbackFunction(playerName);
    }

    public getStoredPlayers(): { [key: string]: HeroToJSON } {
        let players: { [key: string]: HeroToJSON } = {};
        let playersRaw = this.getRawPlayer();

        if (playersRaw) {
            players = JSON.parse(playersRaw);
        } else {
            this.updateRawPlayer(players);
        }

        return players;
    }

    public isWeaponCorectJSON(player: HeroToJSON, weaponKey: string) {
        return constWeapons.has(weaponKey)
            && player.type === constWeapons.get(weaponKey)?.heroClassType
    }

    public deleteHero(players: { [key: string]: HeroToJSON }, player: string) {
        delete players[player];
        this.updateRawPlayer(players);
    }

    public fromJSONToHero(player: HeroToJSON): HeroInfo {
        const playerHeroType = player.type as HERO_TYPES;
        const playerInfoSerializer: HeroSerializer | undefined =
            heroesSerializersRegister.get(playerHeroType);
        let playerInfo: HeroInfo = defaultHeroClass;

        if (playerInfoSerializer) {
            playerInfo = playerInfoSerializer(player);
        }

        return playerInfo;
    }

    public countPotionsJSON(potions: string[], typePotion: string) {
        let countPotion = 0;
        if (potions) {
            potions.forEach(potion => {
                if (potion === typePotion) {
                    countPotion++;
                }
            });
        }

        return countPotion;
    }
    public countPotions(potions: Potion[], typePotion: string) {
        let countPotion = 0;
        if (potions) {
            potions.forEach(potion => {
                if (potion.name === typePotion) {
                    countPotion++;
                }
            });
        }

        return countPotion;
    }

    public statPercent(maxValue: number, currentValue?: number): number {
        let value = currentValue ? (currentValue / maxValue) * 100 : 100;
        return value;
    }

}