import { PLAYER_COUNT_LIMIT, PLAYERS_KEY } from '../globalElements/constants.tsx'
import { weapons } from "../elementsOfHero/weapons";
import * as React from "react";

export default class CharacterManager {
    private updateRawPlayer(players:{ [key: string]: HeroToJSON }){
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }

    private getRawPlayer(){
        return localStorage.getItem(PLAYERS_KEY);
    }

    public savePlayer(player: HeroToJSON, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>) {
        const playersRaw = this.getRawPlayer();
        let players: { [key: string]: HeroToJSON } = {};
    
        if (playersRaw) {
            players = JSON.parse(playersRaw);
        }
    
        const heroCount = Object.keys(players).length;
    
        if (heroCount < PLAYER_COUNT_LIMIT) {
            players[player.name] = player;
            this.updateRawPlayer(players);
            this.saveCurrentPlayer(player.name, callbackFunction);
        }
    }

    public saveCurrentPlayer(playerName: string, callbackFunction: React.Dispatch<React.SetStateAction<HeroInfo>>) {
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

    public isWeaponCorect(player: HeroToJSON, weaponKey:string) {
        return weapons.has(weaponKey)
             && player.type === weapons.get(weaponKey)?.heroClassType
    }       

    public deleteHero(players: { [key: string]: HeroToJSON }, player: string) {
        delete players[player];
        this.updateRawPlayer(players);
    }
}