import { useState } from "react";
import response from "../common/util/test/mockState";
import "./gameState.css";

interface Country {
    name: string;
    id: number;
    color: string;
    armies: number;
    isSelected: boolean;
    isTargetable: boolean;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateGameState: (newCountries: Country[]) => void;
}

const initialCountries = response.data.gameState.countries
    for (let i = 0; i < initialCountries.length; i++) {
        initialCountries[i].isSelected = false;
        initialCountries[i].isTargetable = false;
    }

export default function GameState() {
    
    const [countries, setCountries] = useState(initialCountries);

    function updateGameState(newCountries: Country[]) {
        setCountries(newCountries);
    }

    function highlightTargets(id: number) {
        const targetableCountries: Country[] = countries.map((country: Country) => {
            if (countries[id].connectedTo.includes(country.id)) {
                return {...country, isTargetable: true, isSelected: false};
            }
            return {...country, isTargetable: false, isSelected: false};
        })
        return targetableCountries
    }

    function clearTargets() {
        const targetableCountries: Country[] = countries.map((country: Country) => {
            return {...country, isTargetable: false, isSelected: false};
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
                isSelected={country.isSelected}
                isTargetable={country.isTargetable}
                clearTargets={clearTargets}
                highlightTargets={highlightTargets}
                updateGameState={updateGameState} />
                </p>
            ))}
        </div>
    )


}


function Country({
    name,
    id,
    color,
    armies,
    isSelected,
    isTargetable,
    clearTargets,
    highlightTargets,
    updateGameState}: {
        name: string,
        id: number,
        color: string,
        armies: number,
        isSelected: boolean,
        isTargetable: boolean,
        clearTargets: () => Country[],
        highlightTargets: (id: number ) => Country[],
        updateGameState: (newCountries: Country[]) => void}) {


    function selectCountry(id: number) {
        console.log(id)
        console.log(isSelected)
        if (isSelected) {
            const targetableCountries = clearTargets();
            targetableCountries[id].isSelected = false;
            updateGameState(targetableCountries);
        } else {

            const targetableCountries = highlightTargets(id);
            targetableCountries[id].isSelected = true;
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