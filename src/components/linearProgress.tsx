import { LinearProgress as MuiLinearProgress } from "@mui/material";

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
                className="statProgress"
                variant="determinate"
                color={color}
                value={value}
            />
            <b>{title}</b>
        </div>
    );
}