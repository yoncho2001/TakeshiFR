import { TextField as MuiTextField } from "@mui/material";

interface TextFieldProps {
    className?: string,
    id?:string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ className, id, label, ...restProps}:TextFieldProps ) {
    return (
        <MuiTextField  id={id} className={className} label={label}{...restProps}/>
    );
}