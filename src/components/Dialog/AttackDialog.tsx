import { useState } from "react";
import React from "react";
import './dialog.css'

interface AttackDialog {
    id: number;
    isVisible: boolean;
    confirmAttack: (troopCountq: number) => void;
    cancel: () => void;
}
interface AttackDialogProps {
    isVisible: boolean;
    confirmAttack: (troopCountq: number) => void;
    cancel: () => void;
}

const AttackDialog: React.FC<AttackDialogProps> = ({isVisible, confirmAttack, cancel}) => {

    const [troopCount, setTroopCount] = useState(0);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Attack Dialog - How many armies: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <button onClick={() => confirmAttack(troopCount)}>Attack</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default AttackDialog