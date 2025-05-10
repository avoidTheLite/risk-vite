import React from "react";
import './dialog.css'
import { Button } from "@/components/ui/button";

interface ViewSavedGamesDialogprops {
    isVisible: boolean
    confirmLoadGame: (saveName: string) => void
    cancel: () => void
}

const ViewSavedGamesDialog: React.FC<ViewSavedGamesDialogprops> = ({ isVisible, confirmLoadGame, cancel }) => {

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <h2 className='heading'>Saved Games</h2>
                <Button onClick={() => confirmLoadGame("2NgqTn1uYq - autosave turn 1")}>Load Game</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default ViewSavedGamesDialog