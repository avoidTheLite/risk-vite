

interface QuitGameDialogProps {
    isVisible: boolean;
    confirmQuitGame: () => void;
    cancel: () => void;
}

const QuitGameDialog = ({isVisible, confirmQuitGame, cancel}: QuitGameDialogProps) => {
    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <h2>Are you sure you want to quit the game?</h2>
                <button onClick={() => confirmQuitGame()}>Yes</button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default QuitGameDialog