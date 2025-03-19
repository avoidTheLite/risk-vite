import { useState } from "react";
import response from "../common/util/test/mockState";
import "./gameState.css";

interface Country {
    name: string;
    id: number;
    color: string;
    armies: number;
    isTargetable: boolean;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateGameState: (newCountries: Country[]) => void;
}

export default function GameState() {
    const [countries, setCountries] = useState(response.data.gameState.countries);

    function updateGameState(newCountries: Country[]) {
        setCountries(newCountries);
    }

    function highlightTargets(id: number) {
        const targetableCountries: Country[] = countries.map((country: Country) => {
            if (countries[id].connectedTo.includes(country.id)) {
                return {...country, isTargetable: true};
            }
            return {...country, isTargetable: false};
        })
        return targetableCountries
    }

    function clearTargets() {
        const targetableCountries: Country[] = countries.map((country: Country) => {
            return {...country, isTargetable: false}
        })
        return targetableCountries
    }

    return (
        <div>
            {countries.map((country: Country) => (
                <p>
                <Country 
                key={country.id} 
                name={country.name} 
                id={country.id} 
                color={country.color} 
                armies={country.armies}
                isTargetable={country.isTargetable}
                clearTargets={clearTargets}
                highlightTargets={highlightTargets}
                updateGameState={updateGameState} />
                </p>
            ))}
        </div>
    )


}


function Country({name, id, color, armies, isTargetable, clearTargets, highlightTargets, updateGameState}: {name: string, id: number, color: string, armies: number, isTargetable: boolean, clearTargets: () => Country[], highlightTargets: (id: number ) => Country[], updateGameState: (newCountries: Country[]) => void}) {

    const [isSelected, setIsSelected] = useState(false);

    function selectCountry(id: number) {
        console.log(id)
        if (isSelected) {
            setIsSelected(false);
            const targetableCountries = clearTargets();
            updateGameState(targetableCountries);
        } else {
            setIsSelected(true);
            isTargetable = false;
            const targetableCountries = highlightTargets(id);
            updateGameState(targetableCountries);
        }
        
        
        
    }



    return (
        <>
            <button className={`country ${isSelected ? 'isSelected' :isTargetable ? 'istargetable' : color}`} onClick={() => selectCountry(id)}>
                <p>{id}: {name} Armies = {armies}</p>
            </button>
        </>
    );
}