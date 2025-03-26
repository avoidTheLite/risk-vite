import { useState } from "react";
import React from "react";
import './DeployDialog.css'

interface DeployDialog {
    id: number;
    isVisible: boolean;
    confirmDeploy: (deployTarget: number, troopCount: number) => void;
    cancel: () => void;
    deployTarget: number;
}
interface DeployDialogProps {
    isVisible: boolean;
    confirmDeploy: (deployTarget: number, troopCount: number) => void;
    cancel: () => void;
    deployTarget: number;
}

const DeployDialog: React.FC<DeployDialogProps> = ({isVisible, confirmDeploy, cancel, deployTarget}) => {

    const [troopCount, setTroopCount] = useState(0);

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            Deploy to {deployTarget} - How many armies: {troopCount}? <br/> <br/>
            <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
            <button onClick={() => confirmDeploy(deployTarget, troopCount)}>Deploy</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )
}

export default DeployDialog