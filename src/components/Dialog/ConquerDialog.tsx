import { useState } from "react";
import React from "react";
import './DeployDialog.css'

interface ConquerDialog {
    id: number;
    isVisible: boolean;
    confirmConquer: (troopCountq: number) => void;
    cancel: () => void;
}
interface ConquerDialogProps {
    isVisible: boolean;
    confirmConquer: (troopCountq: number) => void;
    cancel: () => void;
}

const ConquerDialog: React.FC<ConquerDialogProps> = ({isVisible, confirmConquer, cancel}) => {

    const [troopCount, setTroopCount] = useState(0);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Conquer Dialog - How many armies would you like to move: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <button onClick={() => confirmConquer(troopCount)}>Conquer</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default ConquerDialog