import { Link as MuiLink } from "react-router-dom";
import React from "react";

interface LinkProps {
    className?: string;
    to: string;
    level: number;
    levelToReach: number;
    children: React.ReactNode;
    levelName:string;
    setLevel:(input: string) => void;
}

export default function LevelLink({ children, className, to, level, levelToReach,levelName ,setLevel}: LinkProps) {
    const isLocked = level < levelToReach;
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
            <MuiLink to={to} onClick={handleClick} style={{ pointerEvents: isLocked ? 'none' : 'auto' }}>
                {children}
            </MuiLink>
        </div>
    );
}