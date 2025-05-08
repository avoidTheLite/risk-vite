import { useState, useEffect } from "react";
import React from "react";
import { Country } from "../Globe/GameMap";
import './dialog.css'
import { Button } from "@/components/ui/button";

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
                <h2 className='heading'>Conquer</h2>
                Conquer Dialog - How many armies would you like to move: {troopCount}? <br/> <br/>
                <input className="input" type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
                <br/>
                <Button onClick={() => incrementTroopCount(-5)}>-5</Button>
                <Button onClick={() => incrementTroopCount(-1)}>-1</Button>
                <Button onClick={() => incrementTroopCount(1)}>+1</Button>
                <Button onClick={() => incrementTroopCount(5)}>+5</Button>
                <br/>
                <Button onClick={() => confirmConquer(troopCount)}>Conquer</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default ConquerDialog