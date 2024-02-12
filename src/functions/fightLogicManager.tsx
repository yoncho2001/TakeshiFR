import Character from '../classes/Character.tsx';
import Ability from '../classes/Abilities.tsx';
import MageHero from '../classes/MageHero.tsx';
import Villain from '../classes/Villain.tsx';
import RangeHero from '../classes/RangeHero.tsx';
import MeleeHero from '../classes/MeleeHero.tsx';

type PotionEffectHandler = (character: Character, value: number) => void;
type AllCharacters = HeroInfo | Villain

const potionEffects: Record<POTION_FIELDS, PotionEffectHandler> = {
    'HealthPoints': (character, value) => character.heal(value),
    'Mana': (character, value) => character instanceof MageHero && character.healMana(value),
    'Strength': (character, value) => character.heal(value),
};

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

    private villainTurn(player: HeroInfo, villain: Villain, showAlert: (message: string) => void) {
        const abilities = villain.getAbilities();
        let selectAbility: Ability | null = null;

        do {
            selectAbility = this.selectRandomAbility(abilities);
        } while (selectAbility?.getCooldownCount() !== 0);

        if (selectAbility) {
            this.useAbilityEffect(selectAbility, villain, player, showAlert);
        }
    }

    private useAbilityEffect(ability: Ability, character: AllCharacters,
        characterToDie: AllCharacters, showAlert: (message: string) => void) {

        if (ability.getCooldownCount() === 0) {
            const dmg = ability.use(character, characterToDie);
            console.log(dmg);
            characterToDie.takeDamage(dmg);
            this.updateCooldowns(character);
            ability.setcooldownCount();
        } else if (!(character instanceof Villain)) {
            showAlert('This ability is on cooldown');
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

    private isRedy(ability: Ability, showAlert: (message: string) => void): boolean {
        let check = true;

        if (ability.getCooldownCount() > 0) {
            showAlert('This ability is on cooldown');
            check = false;
        }

        return check;
    }


    private updateCooldowns(character: HeroInfo | Villain) {
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
        endTurn: (player: HeroInfo, villain: Villain) => void,
        showAlert: (message: string) => void) {

        if (!this.isRedy(ability, showAlert)){
            return;
        }

        if (!this.haveMana(player, ability, showAlert)){
            return;
        }

        if (!this.haveAmmo(player, showAlert)) {
            return;
        } 

        if (villain.getHealth() <= 0 || player.getHealth() <= 0) {
            endTurn(player, villain);
        } else {

            this.useAbilityEffect(ability, player, villain, showAlert);
            this.villainTurn(player, villain, showAlert);
            endTurn(player, villain);
        }

        this.handleClose(callbackFunction);
    }

    public resetCooldowns(character: HeroInfo) {
        character.getAbilities().map((ability) => (
            ability.resetcooldownCount()
        ));
    }

    public swapWeapons(character: HeroInfo, villain: Villain, callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>, endTurn: (player: HeroInfo, villain: Villain) => void, showAlert: (message: string) => void) {
        const isMeleeHero = character instanceof MeleeHero;

        if (isMeleeHero) {
            character.swapWeapon();
            this.villainTurn(character, villain, showAlert);
            this.handleClose(callbackFunction);
            endTurn(character, villain);
        }
    }

    public usePotion(character: HeroInfo, potionType: string, villain: Villain, callbackFunction: React.Dispatch<React.SetStateAction<HTMLElement | null>>, endTurn: (player: HeroInfo, villain: Villain) => void, showAlert: (message: string) => void) {
        const potionIndex = character.getPotions().findIndex(p => p.name === potionType);
        const potion = character.getPotions()[potionIndex];

        if (potionIndex !== -1 && potion) {
            const effect = potionEffects[potion.affectingField];

            if (effect) {
                effect(character, potion.affectingValue);
            }

            const updatedPotions = character.getPotions().filter((_, index) => index !== potionIndex);
            character.setPotions(updatedPotions);
            this.villainTurn(character, villain, showAlert);
            endTurn(character, villain);
        }

        this.handleClose(callbackFunction);
    }
}