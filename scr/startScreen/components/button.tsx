import { Button as MuiButton } from "@mui/material";
import React from "react";

interface ButtonProps {
    className?: string,
    variant?: "text" | "outlined" | "contained",
    content: string | React.ReactNode,
    icon?: React.ReactNode 
}

export default function Button({ className, variant, content, icon }:ButtonProps ) {
    return (
        <MuiButton variant={variant} className={className} startIcon={icon} >
            {content}
        </MuiButton>
    );
}