import { useEffect, useState } from "react";
import React from "react";
import { Country } from "../Globe/GameMap";
import './dialog.css'
import { Button } from "@/components/ui/button";

interface AttackDialog {
    id: number;
    isVisible: boolean;
    confirmAttack: (troopCountq: number) => void;
    cancel: () => void;
    attackingCountry: number | null;
    countries: Country[];
}
interface AttackDialogProps {
    isVisible: boolean;
    confirmAttack: (troopCountq: number) => void;
    cancel: () => void;
    attackingCountry: number | null;
    countries: Country[];
}

const AttackDialog: React.FC<AttackDialogProps> = ({isVisible, confirmAttack, cancel, attackingCountry, countries}) => {

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
        if (countries[attackingCountry].armies > 3) {
            setTroopCount(3);
        } else {
            setTroopCount(countries[attackingCountry].armies-1);
        }
    }, [attackingCountry, countries])

    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}>
                <h2 className='heading'>Attack</h2>
                Attack Dialog - How many armies: {troopCount}? <br/> <br/>
                <input className="input" type="number" value={troopCount} onChange={(e) => setTroopCount(parseInt(e.target.value, 10))} />
                <br/>
                <Button onClick={() => incrementTroopCount(-1)}>-1</Button>
                <Button onClick={() => incrementTroopCount(1)}>+1</Button>
                <br/>
                <Button onClick={() => confirmAttack(troopCount)}>Attack</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default AttackDialog