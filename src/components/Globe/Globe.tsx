import React from "react";
import Country from "../Country/Country";
import { Turn, Player } from "../../common/types";


interface Globe {
    id: string;
    name: string;
    playerMax: number;
    turnData: Turn;
    players: Player[];
    countries: Country[];
}
interface GlobeProps {
    id: string;
    name: string;
    playerMax: number;
    turnData: Turn;
    players: Player[];
    countries: Country[];
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void;
    initiateMove: (id: number) => void;
}
    
const Globe: React.FC<GlobeProps> = ({name, playerMax, turnData, players, countries, clearTargets, highlightTargets, updateCountries, initiateAttack, initiateMove}) => {
    return (
        <div>
            Globe Name = {name} | Max Players = {playerMax} <br/>
            Turn = {turnData.turn} | Game Phase = {turnData.phase} <br/>
            Active Player = {turnData.activePlayerIndex} | Turn Phase = {turnData.turnTracker.phase} <br/> <hr/>
            Players in Game {players.map((player) => (
                <p key={player.id}>
                    {player.name} | {player.color} | Reinforcements Available: {player.armies}
                </p>
            ))}
            <p>
            {countries.map((country) => (
                <Country
                key={country.id}
                name={country.name}
                id={country.id}
                color={country.color}
                armies={country.armies}
                ownerID={country.ownerID}
                activePlayerIndex={turnData.activePlayerIndex}
                isSelected={country.isSelected}
                isTargetable={country.isTargetable}
                clearTargets={clearTargets}
                highlightTargets={highlightTargets}
                updateCountries={updateCountries}
                initiateAttack={initiateAttack}
                initiateMove={initiateMove}
                />
            ))}
            </p>
    </div>
    )
}

export default Globe