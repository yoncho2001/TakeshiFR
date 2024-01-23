import TextField from '../components/textField.tsx';

function OnBlurName(input:string) {
    localStorage.setItem('playerName', JSON.stringify(input));
}

type InsertNameProps = {
    onChange: (input: string) => void
}

export default function InsertName({ onChange }: InsertNameProps) {
    return (
        <>
            <div className="textField">
                <h2>NAME:</h2>
                <TextField id="playerName" label="Enter Name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(event.target.value);
                    }}
                    // onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                    //     OnBlurName(event.target.value);
                    // }} 
                />
            </div>
        </>);
}