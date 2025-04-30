import { useEffect, useState } from "react";
import React from "react";
import { Country } from "../Globe/GameMap";
import './dialog.css'

interface MoveDialog {
    id: number;
    isVisible: boolean;
    confirmMove: (troopCountq: number) => void;
    cancel: () => void;
    sourceCountry: number | null;
    countries: Country[];
}
interface MoveDialogProps {
    isVisible: boolean;
    confirmMove: (troopCountq: number) => void;
    cancel: () => void;
    sourceCountry: number | null;
    countries: Country[];
}

const MoveDialog: React.FC<MoveDialogProps> = ({isVisible, confirmMove, cancel, sourceCountry, countries}) => {

    const [troopCount, setTroopCount] = useState(0);

    const incrementTroopCount = (count: number) => {
        if (!countries || !sourceCountry) return;
        if (troopCount + count <= 0) {
            setTroopCount(1);
        } else if (troopCount + count >= countries[sourceCountry].armies - 1) {
            setTroopCount(countries[sourceCountry].armies-1);
        }
        else {
            setTroopCount(troopCount + count);
        }
    }

    useEffect(() => {
        if (!countries || !sourceCountry) return;
        setTroopCount(countries[sourceCountry].armies-1);
    }, [isVisible])

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                Move Dialog - How many armies would you like to move: {troopCount}? <br/> <br/>
                <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
                <br/>
                <button onClick={() => incrementTroopCount(-5)}>-5</button>
                <button onClick={() => incrementTroopCount(-1)}>-1</button>
                <button onClick={() => incrementTroopCount(1)}>+1</button>
                <button onClick={() => incrementTroopCount(5)}>+5</button>
                <br/>
                <button onClick={() => confirmMove(troopCount)}>Move</button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default MoveDialog