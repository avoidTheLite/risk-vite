import { useState } from "react";
import PlayerSlotSelector from "./PlayerSlotSelector";
import { Button } from "@/components/ui/button";

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
                <h2 className='heading'>Opening Game</h2>
                <PlayerSlotSelector
                    playerSlots={playerIDs}
                    selectedPlayerSlots={selectedPlayerSlots}
                    setSelectedPlayerSlots={setSelectedPlayerSlots}
                />
                <Button onClick={() => confirmOpenGame(selectedPlayerSlots)}>Open Game</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default OpenGameDialog