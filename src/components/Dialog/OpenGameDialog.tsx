import { useState } from "react";
import PlayerSlotSelector from "./PlayerSlotSelector";

interface OpenGameDialogProps {
    isVisible: boolean;
    confirmOpenGame: (playerSlots: number[]) => void;
    cancel: () => void;
    playerIDs: number[];
}

const OpenGameDialog = ({isVisible, confirmOpenGame, cancel, playerIDs}: OpenGameDialogProps) => {
    const [selectedPlayerSlots, setSelectedPlayerSlots] = useState<number[]>([]);
    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <h2>Opening Game: Select Player Slots</h2>
                <PlayerSlotSelector
                    playerSlots={playerIDs}
                    selectedPlayerSlots={selectedPlayerSlots}
                    setSelectedPlayerSlots={setSelectedPlayerSlots}
                />
                <button onClick={() => confirmOpenGame(selectedPlayerSlots)}>Open Game</button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default OpenGameDialog