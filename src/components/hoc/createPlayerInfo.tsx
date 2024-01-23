import Button from '../button.tsx';

export default function createPlayer(WrappedComponent: typeof Button, type: string, index?: number) {
    const content = (
        <div>{type}</div>
    )

    return <WrappedComponent
        key={index}
        className="playerType"
        variant="text"
        content={content}
        icon={
            <img src={`../../../Picture${type}.svg`}
                alt="icon"
            />
        }
    />
}