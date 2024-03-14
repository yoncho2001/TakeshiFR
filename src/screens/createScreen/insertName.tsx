import TextField from '../../components/textField.tsx';
type InsertNameProps = {
    onChange: (input: string) => void
}

export default function InsertName({ onChange }: InsertNameProps) {
    return (
        <>
            <section className="textField">
                <h2>NAME:</h2>
                <TextField 
                    id="playerName" 
                    label="Enter Name"
                    inputLeters = {15}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(event.target.value);
                    }}
                />
            </section>
        </>
    );
}