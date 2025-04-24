
interface QuitGameProps {
    quitGame: () => void
}

const QuitGameButton = ({quitGame}: QuitGameProps) => {
    return <button onClick={quitGame}>Quit Game</button>
}

export default QuitGameButton