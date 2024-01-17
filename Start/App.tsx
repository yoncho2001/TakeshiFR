import React from 'react';
import './App.less';
import Players from './Buttons';
import Stack from '@mui/material/Stack';

export default function Title() {
  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <Stack className="players" direction="column" spacing={2}>
      < Players/>
      </Stack>
    </>
  );
}

/*import React, { useEffect } from 'react';
import  MeleeHero  from '../classes/TypeHero.tsx';
import WeaponItem from '../classes/Weapon.tsx';
import Potion from '../classes/Potions.tsx';
import Ability from '../classes/Abilities.tsx';

const Title: React.FC = () => {
  useEffect(() => {
    const primaryWeapon = new WeaponItem("Sword", 10, "Melee");
    const secondaryWeapon = new WeaponItem("BigSword", 5, "Melee");
    const potion = [new Potion("healP", "HealthPoints", 20)];
    const ability = [new Ability("heal", ["Melee"], 2, 15, "nqma",()=>{})];

    const meleeHero = new MeleeHero("Warrior", 100, 15, 10,ability, potion, primaryWeapon, secondaryWeapon);

    localStorage.setItem('meleeHero', JSON.stringify(meleeHero));

    const storedHero = localStorage.getItem('meleeHero');
    if (storedHero) {
      const heroObj = JSON.parse(storedHero);
      console.log('Retrieved Hero:', heroObj);
    }
  }, []);

  return (
    <div>
      <h1>Melee Hero </h1>
    </div>
  );
}

export default Title;*/