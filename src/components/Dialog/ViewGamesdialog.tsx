import { useState } from "react";
import React from "react";
import GamesTable from "../Table/GamesTable";
import { LoadGameData, LoadGameTableData } from "../../common/types";

interface ViewGamesDialogProps {
    isVisible: boolean;
    openGameData: LoadGameData[];
    refreshOpenGames: () => void;
    confirmJoinGame: (saveName: string, playerSlots: number[]) => void;
    cancel: () => void;
}

const ViewGamesDialog: React.FC<ViewGamesDialogProps> = ({isVisible, openGameData, refreshOpenGames, confirmJoinGame, cancel}) => {

    const [selectedGame, setSelectedGame] = useState<LoadGameTableData | null>(null);
    const [playerSlots, setPlayerSlots] = useState<number[]>([]);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            <button onClick={() => confirmJoinGame(selectedGame!.saveName, [1])}>Join Game</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={refreshOpenGames}>Refresh</button>
            <GamesTable 
                openGameData={openGameData}
                setSelectedGame={setSelectedGame} 
            />
        </dialog>
    )
}

export default ViewGamesDialog