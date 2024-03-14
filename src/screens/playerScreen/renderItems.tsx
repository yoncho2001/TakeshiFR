import Badge from '../../components/badge';
import CharacterManager from '../../functions/characterManager';
const healthPotion = 'HealthPotion';
const manaPotion = 'ManaPotion';
interface RenderPlayerProps {
    player: HeroToJSON
}

export default function RenderItems({ player }: RenderPlayerProps) {
    let characterManager = new CharacterManager();
    let countHealtP = characterManager.countPotionsJSON(player.potions, healthPotion);
    let countManaP = characterManager.countPotionsJSON(player.potions, manaPotion);

    return (
        <>
            <div id='icon'>
                {countHealtP > 0 &&
                    <Badge className='badgeItem' badgeContent={countHealtP}>
                        <img src={`../../../PictureHealthPotion.svg`} alt="icon" id="imgHealt" />
                    </Badge>
                }
                {countManaP > 0 &&
                    <Badge className='badgeItem' badgeContent={countManaP}>
                        <img src={`../../../PictureManaPotion.svg`} alt="icon" id="imgMana" />
                    </Badge>
                }
                {'secondaryWeapon' in player && characterManager.isWeaponCorectJSON(player, player.secondaryWeapon) &&

                    <img src={`../../../Picture${player.secondaryWeapon}.svg`} alt="icon" id="imgHealt" />

                }
                {'ammo' in player &&
                    <Badge className='badgeItem' badgeContent={player.ammo} >
                        <img src={`../../../PictureArrow.svg`} alt="icon" id="imgHealt" />
                    </Badge>
                }
            </div>
        </>
    );
}