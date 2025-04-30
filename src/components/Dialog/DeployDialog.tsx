import { useState, useEffect } from "react";
import React from "react";
import './dialog.css'

interface DeployDialog {
    id: number;
    isVisible: boolean;
    confirmDeploy: (deployTarget: number, troopCount: number) => void;
    cancel: () => void;
    deployTarget: number;
    playerArmies: number;
}
interface DeployDialogProps {
    isVisible: boolean;
    confirmDeploy: (deployTarget: number, troopCount: number) => void;
    cancel: () => void;
    deployTarget: number;
    playerArmies: number;
}

const DeployDialog: React.FC<DeployDialogProps> = ({isVisible, confirmDeploy, cancel, deployTarget, playerArmies}) => {

    const [troopCount, setTroopCount] = useState(0);

    function incrementTroopCount(count: number): void {
        if (troopCount + count <= 0) {
            setTroopCount(1);
        } else if (troopCount + count >= playerArmies) {
            setTroopCount(playerArmies);
        }
            else {
            setTroopCount(troopCount + count);
        }
    }

    useEffect(() => {
        setTroopCount(playerArmies);
    }, [playerArmies])

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Deploy to {deployTarget} - How many armies: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <br/>
            <button onClick={() => incrementTroopCount(-5)}>-5</button>
            <button onClick={() => incrementTroopCount(-1)}>-1</button>
            <button onClick={() => incrementTroopCount(1)}>+1</button>
            <button onClick={() => incrementTroopCount(5)}>+5</button>
            <br/>
            <button onClick={() => confirmDeploy(deployTarget, troopCount)}>Deploy</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default DeployDialog