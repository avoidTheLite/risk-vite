import { useState, useEffect } from "react";
import React from "react";
import GamesTable from "../Table/GamesTable";
import { LoadGameData, LoadGameTableData } from "../../common/types";
import PlayerSlotSelector from "./PlayerSlotSelector";
import { Button } from "@/components/ui/button";

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
    const [selectedPlayerSlots, setSelectedPlayerSlots] = useState<number[]>([]);

    useEffect(() => {
        if (selectedGame) {
            setPlayerSlots(openGameData.find(game => game.saveName == selectedGame.saveName)!!.playerSlots);
            setSelectedPlayerSlots([]);
        }
    }, [selectedGame])
    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <GamesTable 
                    openGameData={openGameData}
                    setSelectedGame={setSelectedGame} 
                />
                <PlayerSlotSelector
                    playerSlots={playerSlots}
                    selectedPlayerSlots={selectedPlayerSlots}
                    setSelectedPlayerSlots={setSelectedPlayerSlots}
                />
                <Button onClick={() => confirmJoinGame(selectedGame!.saveName, selectedPlayerSlots)}>Join Game</Button>
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={refreshOpenGames}>Refresh</Button>
            </dialog>
        </div>
    )
}

export default ViewGamesDialog