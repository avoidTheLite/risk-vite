import { useState } from "react";
import response from "../common/util/test/mockState";
import "./gameState.css";

interface Country {
    name: string;
    id: number;
    color: string;
    armies: number;
}

export default function GameState() {
    const [countries, setCountries] = useState(response.data.gameState.countries);

    function updateGameState(newCountries: Country[]) {
        setCountries(newCountries);
    }

    return (
        <div>
            {countries.map((country: Country) => (
                <p>
                <Country key={country.id} name={country.name} id={country.id} color={country.color} armies={country.armies} />
                </p>
            ))}
        </div>
    )


}


function Country({name, id, color, armies}: {name: string, id: number, color: string, armies: number}) {
    return (
        <>
            <button className={`country ${color}`}>
                <p>{id}: {name} Armies = {armies}</p>
            </button>
        </>
    );
}