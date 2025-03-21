import { useState } from "react";
import React from "react";
import './DeployDialog.css'

interface AttackDialog {
    id: number;
    isVisible: boolean;
    confirmAttack: () => void;
}
interface AttackDialogProps {
    isVisible: boolean
    confirmAttack: () => void
}

const AttackDialog: React.FC<AttackDialogProps> = ({isVisible, confirmAttack}) => {

    const [troopCount, setTroopCount] = useState(0);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Attack Dialog - How many armies: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <button onClick={confirmAttack}>Attack</button>
        </dialog>
    )
}

export default AttackDialog