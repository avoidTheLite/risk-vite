import React from "react";
import Country from "../Country/Country";
import { Turn, Player } from "../../common/types";
import "./Globe.css"


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
            <div className="globe-info">
                Globe Name: {name} | Max Players: {playerMax} <br/>
                Game Phase: {turnData.phase} 
                <hr/>
                <span className="globe-content">
                    <div>
                    Turn: {turnData.turn} <br/>
                    Turn Phase: {turnData.turnTracker.phase} <br/> <br/>
                    </div>
                    {players.map((player) => (
                        <div key={player.id}> 
                            {player.name} | {player.color} | Reinforcements: {player.armies}
                            <span className="bold">
                                {player.id === turnData.activePlayerIndex ? ` <---- Active Player` : ''}
                            </span>
                            
                        </div>
                    ))}
                </span>
            </div>
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