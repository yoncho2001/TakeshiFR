import { Link as MuiLink } from "react-router-dom";
import React from "react";

interface LinkProps {
    className?: string;
    to: string;
    level: number;
    levelToReach: number;
    children: React.ReactNode;
}

export default function LevelLink({ children, className, to, level, levelToReach }: LinkProps) {
    const isLocked = level < levelToReach;

    return (
        <div className={className}>
            {isLocked && (
                <div id="lockImg">
                    <img src={`../../../lock-icon.png`} alt="Locked" style={{ zIndex: 1 }} />
                </div>
            )}
            <MuiLink to={to} style={{ pointerEvents: isLocked ? 'none' : 'auto' }}>
                {children}
            </MuiLink>
        </div>
    );
}