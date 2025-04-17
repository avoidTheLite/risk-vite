
interface OpenGameButtonProps {
    openGame: () => void;
}

const OpenGameButton = ({openGame}: OpenGameButtonProps) => {
    return <button onClick={(openGame)}>Open Game</button>
}

export default OpenGameButton