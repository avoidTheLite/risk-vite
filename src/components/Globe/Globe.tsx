import React from "react";
import { Country } from "../Globe/GameMap"
import GameMap from "./GameMap";
import { Turn, Player } from "../../common/types";
import "./Globe.css"
import EndTurnButton from "../Buttons/EndTurnButton";

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
    turnData: Turn;
    players: Player[];
    countries: Country[];
    getClassName: (id: number) => string;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void;
    initiateMove: (id: number) => void;
    endTurn: () => void
}
    
const Globe: React.FC<GlobeProps> = ({turnData, players, countries, getClassName, clearTargets, highlightTargets, updateCountries, initiateAttack, initiateMove, endTurn}) => {
    return (
        <div className="globe-container">
            <div className="globe-info-and-controls">
                <div className="globe-info">
                    <span className="globe-content">
                        <div>
                        Game Phase: {turnData.phase} <br/>
                        Turn: {turnData.turn} ({turnData.turnTracker.phase})<br/>
                        </div>
                        {players.map((player) => (
                            <div key={player.id}> 
                                {player.name} | {player.color} | Armies: {player.armies}
                                
                            </div>
                        ))} <br/>
                        <span className = "active-player">
                            It is {players[turnData.activePlayerIndex].name}'s turn. (Player {players[turnData.activePlayerIndex].id})
                        </span>
                    </span>
                </div>
                <EndTurnButton endTurn={endTurn} />
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