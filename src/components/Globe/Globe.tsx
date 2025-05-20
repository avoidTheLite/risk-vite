import React from "react";
import { Country } from "../Globe/GameMap"
import GameMap from "./GameMap";
import { Turn, Player } from "../../common/types";
import "./Globe.css"
import EndTurnButton from "../Buttons/EndTurnButton";
import ViewCardsButton from "../Buttons/ViewCardsButton";
import { CardData } from "../../common/types";
import UpdateMessage from "./UpdateMessage";

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
    updateMessage: string | null;
    getClassName: (id: number) => string;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void;
    initiateMove: (id: number) => void;
    endTurn: () => void
    viewCards: (playerID: number) => void
    playerCards: CardData[]
}
    
const Globe: React.FC<GlobeProps> = ({turnData, players, countries, updateMessage, getClassName, clearTargets, highlightTargets, updateCountries, initiateAttack, initiateMove, endTurn, viewCards, playerCards}) => {
    return (
        <div className="globe-container">
            <div className="globe-info-and-controls">
                <div className="globe-info">
                    <span className = "active-player">
                        It is {players[turnData.activePlayerIndex].name}'s turn. (Player {players[turnData.activePlayerIndex].id})
                    </span>
                </div>
                <div>
                    <UpdateMessage message={updateMessage} />
                </div>
                
            </div>
            <div className="flex justify-between">
                <ViewCardsButton 
                    viewCards={viewCards}
                    playerID={turnData.activePlayerIndex}
                    playerCards={playerCards} />
                <EndTurnButton endTurn={endTurn} />
            </div>
            <div className="mt-1 mb-1 border-accent border-2">
                <GameMap
                    countries={countries}
                    activePlayerIndex={turnData.activePlayerIndex}
                    getClassName={getClassName}
                    highlightTargets={highlightTargets}
                    clearTargets={clearTargets}
                    updateCountries={updateCountries}
                    initiateAttack={initiateAttack}
                    initiateMove={initiateMove} 
                />
            </div>
        </div>
    )
}

export default Globe