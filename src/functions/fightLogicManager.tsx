import Character from '../classes/Character.tsx';
import Ability from '../classes/Abilities.tsx';
import MageHero from '../classes/MageHero.tsx';
import Villain from '../classes/Villain.tsx';
import RangeHero from '../classes/RangeHero.tsx';
import MeleeHero from '../classes/MeleeHero.tsx';
import { HEALTH_POINTS, MANA_POINTS, STRENGHT_POINTS } from '../globalElements/constants.tsx';

type PotionEffectHandler = (character: Character, value: number) => void;
type AllCharacters = HeroInfo | Villain

const potionEffects = new Map<POTION_FIELDS, PotionEffectHandler>([
    [HEALTH_POINTS, (character: Character, value: number) => character.heal(value)],
    [MANA_POINTS, (character: Character, value: number) => character instanceof MageHero && character.healMana(value)],
    [STRENGHT_POINTS, (character: Character, value: number) => character.heal(value)],
]);

export default class FightLogicManager {
    private selectRandomAbility(abilities: Ability[]): Ability | null {
        if (abilities.length === 0) return null;

        let totalWeight = 0;
        for (let i = 0; i < abilities.length; i++) {
            totalWeight += Math.pow(2, -i);
        }

        let randomChance = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let i = 0; i < abilities.length; i++) {
            cumulativeWeight += Math.pow(2, -i);

            if (randomChance <= cumulativeWeight) {
                return abilities[i];
            }
        }

        return abilities[abilities.length - 1];
    }

    private villainTurn(player: HeroInfo, villain: Villain,
        endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
        handleShowSketch: (abilityImg: string, isVilain: boolean) => void) {
        const abilities = villain.getAbilities();
        let selectAbility: Ability | null = null;

        if (villain.getHealth() <= 0) {
            endTurn(player, villain, 'player');
            return;
        }

        do {
            selectAbility = this.selectRandomAbility(abilities);
        } while (selectAbility?.getCooldownCount() !== 0);

        if (selectAbility) {
            this.useAbilityEffect(selectAbility, villain, player, endTurn, handleShowSketch);
        }
    }

    private useAbilityEffect(ability: Ability, character: AllCharacters,
        characterToDie: AllCharacters,
        endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
        handleShowSketch: (abilityImg: string, isVilain: boolean) => void) {
        const isRangeHero = character instanceof RangeHero;
        const isVilain = character instanceof Villain;
        let abilityName = "";

        if (ability.getCooldownCount() === 0) {

            if (isRangeHero) {
                abilityName = ability.getName() + "Range";
            } else {
                abilityName = ability.getName();
            }

            if (!isVilain) {
                endTurn(character, characterToDie as Villain, 'player');
            }

            handleShowSketch(abilityName, isVilain);

            setTimeout(() => {
                const dmg = ability.use(character, characterToDie);
                console.log(dmg);
                characterToDie.takeDamage(dmg);
                this.updateCooldowns(character);
                ability.setcooldownCount();

                if (isVilain) {
                    endTurn(characterToDie as HeroInfo, character, 'villain');
                } else{
                    endTurn(character, characterToDie as Villain, 'playerEnd');
                }
            }, 1000);
        }
    }

    private haveMana(character: AllCharacters, ability: Ability, showAlert: (message: string) => void): boolean {
        const cost = ability.getCost();
        const isMageHero = character instanceof MageHero
        let check = true;

        if (isMageHero && character.getMana() >= cost) {
            character.takeMana(cost);
        } else if (isMageHero) {
            check = false;
            showAlert(`Not enough mana to use ${ability.getName()}.`);
        }

        return check;
    }

    private haveAmmo(character: AllCharacters, showAlert: (message: string) => void): boolean {
        const isRangeHero = character instanceof RangeHero;
        let check = true;

        if (isRangeHero && character.getAmmo() >= 1) {
            character.useAmmo();
        } else if (isRangeHero) {
            check = false;
            showAlert(`Not enough ammo.`);
        }

        return check;
    }

    private updateCooldowns(character: AllCharacters) {
        character.getAbilities().map((ability) => (
            ability.lowerCooldown()
        ));
    }

    public handleClick(event: React.MouseEvent<HTMLButtonElement>, callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>) {
        callbackFunction(event.currentTarget);
    };

    public handleClose(callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>) {
        callbackFunction(null);
    };

    public makeDMG(player: HeroInfo,
        villain: Villain,
        ability: Ability,
        callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
        endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
        showAlert: (message: string) => void,
        handleShowSketch: (abilityImg: string, isVilain: boolean) => void) {

        if (!this.haveMana(player, ability, showAlert)) {
            return;
        }

        if (!this.haveAmmo(player, showAlert)) {
            return;
        }
        if (villain.getHealth() <= 0 || player.getHealth() <= 0) {
            endTurn(player, villain, 'end');
        } else {
            this.useAbilityEffect(ability, player, villain, endTurn, handleShowSketch);

            setTimeout(() => {
                this.villainTurn(player, villain, endTurn, handleShowSketch);
            }, 2000);
        }

        this.handleClose(callbackFunction);
    }

    public resetCooldowns(character: HeroInfo) {
        character.getAbilities().map((ability) => (
            ability.resetcooldownCount()
        ));
    }

    public swapWeapons(character: HeroInfo, villain: Villain,
        callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
        endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
        handleShowSketch: (abilityImg: string, isVilain: boolean) => void) {
        const isMeleeHero = character instanceof MeleeHero;

        if (isMeleeHero) {
            endTurn(character, villain, 'player');
            character.swapWeapon();
            this.updateCooldowns(character);
            this.handleClose(callbackFunction);

            this.villainTurn(character, villain, endTurn, handleShowSketch);
        }
    }

    public usePotion(character: HeroInfo, potionType: string, villain: Villain,
        callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
        endTurn: (player: HeroInfo, villain: Villain, endOf: string) => void,
        handleShowSketch: (abilityImg: string, isVilain: boolean) => void) {
        const potionIndex = character.getPotions().findIndex(p => p.name === potionType);
        const potion = character.getPotions()[potionIndex];

        if (potionIndex !== -1 && potion) {
            endTurn(character, villain, 'player');
            const effect = potionEffects.get(potion.affectingField);

            if (effect) {
                effect(character, potion.affectingValue);
            }

            const updatedPotions = character.getPotions().filter((_, index) => index !== potionIndex);
            character.setPotions(updatedPotions);
            this.updateCooldowns(character);

            this.villainTurn(character, villain, endTurn, handleShowSketch);
        }

        this.handleClose(callbackFunction);
    }
}