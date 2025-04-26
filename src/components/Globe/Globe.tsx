import React from "react";
import { Country } from "../Globe/GameMap"
import GameMap from "./GameMap";
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
    getClassName: (id: number) => string;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void;
    initiateMove: (id: number) => void;
}
    
const Globe: React.FC<GlobeProps> = ({name, playerMax, turnData, players, countries, getClassName, clearTargets, highlightTargets, updateCountries, initiateAttack, initiateMove}) => {
    return (
        <div>
            <div className="globe-info">
                Globe Name: {name} | Max Players: {playerMax} <br/>
                Game Phase: {turnData.phase} 
                <span className="globe-content">
                    <div>
                    Turn: {turnData.turn} <br/>
                    Turn Phase: {turnData.turnTracker.phase} <br/>
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
            <GameMap countries={countries}
                activePlayerIndex={turnData.activePlayerIndex}
                getClassName={getClassName}
                highlightTargets={highlightTargets}
                clearTargets={clearTargets}
                updateCountries={updateCountries}
                initiateAttack={initiateAttack}
                initiateMove={initiateMove} 
            />
    </div>
    )
}

export default Globe