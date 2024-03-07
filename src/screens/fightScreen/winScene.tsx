import { Link } from "react-router-dom";
import { villainsRegister } from "../../elementsOfHero/villains";
import Button from "../../components/button";
import { Modal } from "@mui/material";
import { DESERT_BOSS } from "../../globalElements/constants";
import { stopDiscoColor } from "../../functions/discoMode";

interface WinSceneProps {
    isWin: boolean,
    levelName: string,
    player: HeroInfo,
}

export default function WinScene({ isWin, levelName, player }: WinSceneProps) {
    const villainInfo = villainsRegister.get(levelName) || { name: DESERT_BOSS, levelToReech: 1 };

    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="game-over-screen">
                    <h1 className="winTytle">{isWin ? "Win" : "Defeat"}</h1>
                    <p className="winTytle">{isWin ? `You won level ${villainInfo?.name}!` : "You have been defeated!"} </p>

                    {isWin &&
                        <> 
                            <p className="winTytle"> {`You level up to level ${player.getLevel()}`} </p>
                            
                        </>
                    }
                    <Link to='/levels' className="buttonLink">
                        <Button onClick={() => { stopDiscoColor() }} variant='contained' className='emptyButton' content={'Return to levels'} />
                    </Link>
                </div>
            </Modal>
        </>
    );
}