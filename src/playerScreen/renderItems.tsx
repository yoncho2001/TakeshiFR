import Badge from '../components/badge';

const healthPotion = 'HealthPotion';
const manaPotion = 'ManaPotion';
interface RenderPlayerProps {
    player: HeroToJSON
}

export default function RenderItems({ player }: RenderPlayerProps) {
    if (!player) {
        return <>
            <div>Loading player data or player not found...</div>
        </>
    }
    let countHealtP = countPotions(player.potions, healthPotion);
    let countManaP = countPotions(player.potions, manaPotion);

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
                {'secondaryWeapon' in player &&

                    <img src={`../../../Picture${player.secondaryWeapon.name}.svg`} alt="icon" id="imgHealt" />

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

function countPotions(potions: string[], typePotion: string) {
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