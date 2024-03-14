import { LinearProgress as MuiLinearProgress } from "@mui/material";
import { discoBackground, discoColor } from "../globalElements/constants";

interface LinearProgressProps {
    className?: string;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined;
    value: number;
    title: number;
}

export default function LinearProgress({ className, color, value, title }: LinearProgressProps) {
    return (
        <div className={className}>
            <MuiLinearProgress
                className={"statProgress " + discoBackground}
                variant="determinate"
                color={color}
                value={value}
            />
            <b className= {discoColor}>{title}</b>
        </div>
    );
}