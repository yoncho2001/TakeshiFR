import { TextField as MuiTextField } from "@mui/material";

interface TextFieldProps {
    className?: string,
    id?: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    inputLeters:number
}

export default function TextField({ className, id, label, inputLeters, ...restProps }: TextFieldProps) {    return <MuiTextField
        id={id}
        className={className}
        label={label}{...restProps}
        inputProps={{
            maxLength: inputLeters
          }}
    />;
}