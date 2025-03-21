import React from "react";
import Country from "../Country/Country";

// interface Continent {
//     id: string;
//     name: string;
//     countries: number[];
//     armies: number;
// }

interface Globe {
    id: string;
    name: string;
    playerMax: number;
    countries: Country[];
}
interface GlobeProps {
    id: string;
    name: string;
    playerMax: number;
    countries: Country[];
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void;
    // continenets: Continent[];
}

const Globe: React.FC<GlobeProps> = ({name, playerMax, countries, clearTargets, highlightTargets, updateCountries, initiateAttack}) => {
    return (
        <div>
            Globe Name = {name} | Max Players = {playerMax}
            <p>
            {countries.map((country) => (
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
                updateCountries={updateCountries}
                initiateAttack={initiateAttack}
                />
            ))}
            </p>
    </div>
    )
}

export default Globe