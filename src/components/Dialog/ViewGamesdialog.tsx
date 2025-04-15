import { useState } from "react";
import React from "react";

interface ViewGamesDialogProps {
    isVisible: boolean;
    confirmJoinGame: (saveName: string, playerSlots: number[]) => void;
    cancel: () => void;
}

const ViewGamesDialog: React.FC<ViewGamesDialogProps> = ({isVisible, confirmJoinGame, cancel}) => {

    const [saveName, setSaveName] = useState('');
    const [playerSlots, setPlayerSlots] = useState<number[]>([]);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}