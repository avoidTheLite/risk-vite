import { useState, useEffect } from "react";
import React from "react";
import { Country } from "../Globe/GameMap";
import './dialog.css'

interface ConquerDialog {
    id: number;
    isVisible: boolean;
    confirmConquer: (troopCountq: number) => void;
    cancel: () => void;
    attackingCountry: number | null;
    countries: Country[];
}
interface ConquerDialogProps {
    isVisible: boolean;
    confirmConquer: (troopCountq: number) => void;
    cancel: () => void;
    attackingCountry: number | null;
    countries: Country[];
}

const ConquerDialog: React.FC<ConquerDialogProps> = ({isVisible, confirmConquer, cancel, attackingCountry, countries}) => {

    const [troopCount, setTroopCount] = useState(0);

    const incrementTroopCount = (count: number) => {
        if (!countries || !attackingCountry) return;
        if (troopCount + count <= 0) {
            setTroopCount(1);
        } else if (troopCount + count >= countries[attackingCountry].armies - 1) {
            setTroopCount(countries[attackingCountry].armies-1);
        }
        else {
            setTroopCount(troopCount + count);
        }
    }

    useEffect(() => {
            if (!countries || !attackingCountry) return;
            setTroopCount(countries[attackingCountry].armies-1);
    }, [isVisible])

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                Conquer Dialog - How many armies would you like to move: {troopCount}? <br/> <br/>
                <input type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
                <br/>
                <button onClick={() => incrementTroopCount(-5)}>-5</button>
                <button onClick={() => incrementTroopCount(-1)}>-1</button>
                <button onClick={() => incrementTroopCount(1)}>+1</button>
                <button onClick={() => incrementTroopCount(5)}>+5</button>
                <br/>
                <button onClick={() => confirmConquer(troopCount)}>Conquer</button>
                <button onClick={cancel}>Cancel</button>
            </dialog>
        </div>
    )
}

export default ConquerDialog