import { Link as MuiLink } from "react-router-dom";
import React from "react";
import { villainsRegister } from "../elementsOfHero/villains";

interface LinkProps {
    className?: string;
    to: string;
    level: number;
    children: React.ReactNode;
    levelName: string;
    setLevel: (input: string) => void;
}

export default function LevelLink({ children, className, to, level, levelName, setLevel }: LinkProps) {
    let villainInfo = villainsRegister.get(levelName);
    let isLocked = true;

    if (villainInfo) {
        isLocked = level < villainInfo?.levelToReech;
    }

    const handleClick = () => {
        setLevel(levelName);
    };

    return (
        <div className={className}>
            {isLocked && (
                <div id="lockImg">
                    <img src={`../../../lock-icon.png`} alt="Locked" style={{ zIndex: 1 }} />
                </div>
            )}
            <MuiLink
                to={to}
                onClick={handleClick}
                style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
            >
                {children}
            </MuiLink>
        </div>
    );
}