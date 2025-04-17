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

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            <h2>Opening Game: Select Player Slots</h2>
            <PlayerSlotSelector
                playerSlots={playerIDs}
                selectedPlayerSlots={selectedPlayerSlots}
                setSelectedPlayerSlots={setSelectedPlayerSlots}
            />
            <button onClick={() => confirmOpenGame(selectedPlayerSlots)}>Open Game</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default OpenGameDialog