import { Button as MuiButton } from "@mui/material";
import React from "react";

interface ButtonProps {
    className?: string,
    variant?: "text" | "outlined" | "contained",
    content: string | React.ReactNode,
    herf?:string,
    icon?: React.ReactNode,
}

export default function Button({ content, herf,icon, ...restProps}:ButtonProps ) {
    return (
        <MuiButton  href= {herf} startIcon={icon} {...restProps}>
            {content}
        </MuiButton>
    );
}