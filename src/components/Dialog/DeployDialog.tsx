import { useState, useEffect } from "react";
import React from "react";
import './dialog.css'
import { Button } from "@/components/ui/button";

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

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className="dialog">
                <h2 className="heading">Deploy</h2>
                Deploy to {deployTarget} - How many armies: {troopCount}? <br/> <br/>
                <input className="input" type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
                <br/>
                <Button onClick={() => incrementTroopCount(-5)}>-5</Button>
                <Button onClick={() => incrementTroopCount(-1)}>-1</Button>
                <Button onClick={() => incrementTroopCount(1)}>+1</Button>
                <Button onClick={() => incrementTroopCount(5)}>+5</Button>
                <br/>
                <Button onClick={() => confirmDeploy(deployTarget, troopCount)}>Deploy</Button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default DeployDialog