import { Badge as MuiBadge } from "@mui/material";
import React from "react";

interface BadgeProps {
    className?: string
    badgeContent: number
    children: React.ReactNode;
}

export default function Badge({ className, badgeContent, children }: BadgeProps) {
    return (
        <MuiBadge 
            className={className} badgeContent={badgeContent} color="primary"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {children}
        </MuiBadge>
    );
}