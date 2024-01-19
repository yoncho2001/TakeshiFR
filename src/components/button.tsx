import { Button as MuiButton } from "@mui/material";
import React from "react";

interface ButtonProps {
    className?: string,
    variant?: "text" | "outlined" | "contained",
    content: string | React.ReactNode,
    herf?:string,
    icon?: React.ReactNode 
}

export default function Button({ className, variant, content, icon, herf }:ButtonProps ) {
    return (
        <MuiButton variant={variant} className={className} href= {herf} startIcon={icon} >
            {content}
        </MuiButton>
    );
}