import React from 'react';
import './screen.less';
import Players from './Buttons';
import Stack from '@mui/material/Stack';

export default function StartScreen() {
  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <Stack className="players" direction="column" spacing={2}>
        < Players />
      </Stack>
    </>
  );
}


/*
import React, { useEffect } from 'react';
import  MeleeHero  from '../../classes/MeleHero.tsx';
import  MageHero  from '../../classes/MageHero.tsx';
import WeaponItem from '../../classes/Weapon.tsx';
import Potion from '../../classes/Potions.tsx';
import Ability from '../../classes/Abilities.tsx';

const AddHero: React.FC = () => {
  useEffect(() => {
    const primaryWeapon = new WeaponItem("Sword", 10, "Melee");
    const secondaryWeapon = new WeaponItem("BigSword", 5, "Melee");
    const potion = [new Potion("healP", "HealthPoints", 20)];
    const ability = [new Ability("heal", ["Melee","Mage"], 2, 15, "nqma",()=>{})];
    const meleeHero = new MeleeHero("Warrior", 100, 15, 10, ability, potion, primaryWeapon, secondaryWeapon);

    const primaryWeaponM = new WeaponItem("Staf", 10, "Mage");
    const mageHero = new MageHero("Gandalf", 120, 20, 10, ability, potion, primaryWeaponM,100);

    let players = [meleeHero,mageHero,null];
    localStorage.setItem('players', JSON.stringify(players));

    const storedHero = localStorage.getItem('players');
    if (storedHero) {
      const heroObj = JSON.parse(storedHero);
      console.log(heroObj);
    }
  }, []);

  return (
    <div>
      <h1>Melee Hero </h1>
    </div>
  );
}

export default AddHero;*/