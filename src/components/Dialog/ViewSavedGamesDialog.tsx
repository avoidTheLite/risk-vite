import React, { useEffect, useState } from "react";
import './dialog.css'
import GamesTable from "../Table/GamesTable";
import { LoadGameData, LoadGameTableData } from "../../common/types";
import { Button } from "@/components/ui/button";

interface ViewSavedGamesDialogprops {
    isVisible: boolean
    savedGameData: LoadGameData[]
    refreshSavedGames: () => void
    confirmLoadGame: (saveName: string) => void
    cancel: () => void
}

const ViewSavedGamesDialog: React.FC<ViewSavedGamesDialogprops> = ({ isVisible, savedGameData, refreshSavedGames, confirmLoadGame, cancel }) => {

    const [selectedGame, setSelectedGame] = useState<LoadGameTableData | null>(null);

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <h2 className='heading'>Saved Games</h2>
                <GamesTable 
                    openGameData={savedGameData}
                    setSelectedGame={setSelectedGame} 
                />
                {selectedGame ? <Button onClick={() => confirmLoadGame(selectedGame!.saveName)}>Load Game</Button> : null}
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={refreshSavedGames}>Refresh</Button>
            </dialog>
        </div>
    )
}

export default ViewSavedGamesDialog