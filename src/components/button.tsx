import { Button as MuiButton } from "@mui/material";
import React from "react";

interface ButtonProps {
    className?: string,
    variant?: "text" | "outlined" | "contained",
    content: string | React.ReactNode,
    herf?: string,
    icon?: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function Button({ content, herf, icon, onClick, ...restProps }: ButtonProps) {
    return (
        <MuiButton href={herf} startIcon={icon} onClick={onClick} {...restProps} >
            {content}
        </MuiButton>
    );
}