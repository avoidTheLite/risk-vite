

interface QuitGameDialogProps {
    isVisible: boolean;
    confirmQuitGame: () => void;
    cancel: () => void;
}

const QuitGameDialog = ({isVisible, confirmQuitGame, cancel}: QuitGameDialogProps) => {
    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            <h2>Are you sure you want to quit the game?</h2>
            <button onClick={() => confirmQuitGame()}>Yes</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default QuitGameDialog