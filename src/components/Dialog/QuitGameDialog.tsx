

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
                <h2 className='heading'>Quit Game?</h2>
                <p className="m-1">Are you sure you want to quit the game?</p>
                <button onClick={() => confirmQuitGame()}>Yes</button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default QuitGameDialog