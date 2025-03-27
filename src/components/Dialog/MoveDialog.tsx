import { useState } from "react";
import React from "react";
import './DeployDialog.css'

interface MoveDialog {
    id: number;
    isVisible: boolean;
    confirmMove: (troopCountq: number) => void;
    cancel: () => void;
}
interface MoveDialogProps {
    isVisible: boolean;
    confirmMove: (troopCountq: number) => void;
    cancel: () => void;
}

const MoveDialog: React.FC<MoveDialogProps> = ({isVisible, confirmMove, cancel}) => {

    const [troopCount, setTroopCount] = useState(0);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Move Dialog - How many armies would you like to move: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <br/>
            <button onClick={() => confirmMove(troopCount)}>Move</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default MoveDialog