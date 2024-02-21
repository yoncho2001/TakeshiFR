import { Button as MuiButton } from "@mui/material";
import React, { CSSProperties } from "react";

interface ButtonProps {
    id?: string
    className?: string,
    variant?: "text" | "outlined" | "contained",
    content?: string | React.ReactNode,
    icon?: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    style?: CSSProperties
}

export default function Button({ content, icon, onClick, style, ...restProps }: ButtonProps) {
    return (
        <MuiButton
            startIcon={icon}
            onClick={onClick}
            {...restProps}
            style={style}
        >
            {content}
        </MuiButton>
    );
}