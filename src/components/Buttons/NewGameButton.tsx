
interface NewGameButton {
    newGame: () => void
}

const NewGameButton = ({ newGame }: NewGameButton) => {
    return <button onClick={newGame}>New Game</button>
}

export default NewGameButton