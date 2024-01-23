import { TextField as MuiTextField } from "@mui/material";

interface TextFieldProps {
    className?: string,
    id?:string,
    label: string,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ className, id, label, onBlur, ...restProps}:TextFieldProps ) {
    return (
        <MuiTextField  id={id} className={className} label={label} onBlur={onBlur} {...restProps}/>
    );
}