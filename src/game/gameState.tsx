import { useState } from "react";
import response from "../common/util/test/mockState";
import "./gameState.css";
import Country from "../components/Country/Country";


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


