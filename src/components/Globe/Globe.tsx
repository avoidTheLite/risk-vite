import React from "react";
import { Country } from "../Globe/GameMap"
import GameMap from "./GameMap";
import { Turn, Player } from "../../common/types";
import "./Globe.css"
import EndTurnButton from "../Buttons/EndTurnButton";
import { Button } from "@/components/ui/button";
import { TransformWrapper, TransformComponent, MiniMap, useControls } from "react-zoom-pan-pinch";

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
const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      <div>
        <Button size="sm" onClick={() => zoomIn()}>Zoom In</Button>
        <Button size="sm" onClick={() => zoomOut()}>Zoom Out</Button>
        <Button size="sm" onClick={() => resetTransform()}>Reset Zoom</Button>
      </div>
    );
  };
    
const Globe: React.FC<GlobeProps> = ({turnData, players, countries, getClassName, clearTargets, highlightTargets, updateCountries, initiateAttack, initiateMove, endTurn}) => {
    return (
        <div className="globe-container">
            <div className="globe-info-and-controls">
                <div className="globe-info">
                    <span className="globe-content">
                        <span className = "active-player">
                            It is {players[turnData.activePlayerIndex].name}'s turn. (Player {players[turnData.activePlayerIndex].id})
                        </span>
                    </span>
                </div>
                <EndTurnButton endTurn={endTurn} />
            </div>
            <TransformWrapper 
                initialScale={1}
                minScale={1}
                maxScale={5}
                centerOnInit
                limitToBounds
                smooth={false}
                wheel={{ step: 0.1 }}
                pinch={{ step: 0.1 }}
                doubleClick={{ disabled: false }}
                panning={{ velocityDisabled: true }}
            >
                <div className="flex justify-between">
                    <MiniMap
                        width={100}
                        height={75}
                        borderColor="#888"
                        >
                        <GameMap countries={countries}
                            activePlayerIndex={turnData.activePlayerIndex}
                            getClassName={getClassName}
                            highlightTargets={highlightTargets}
                            clearTargets={clearTargets}
                            updateCountries={updateCountries}
                            initiateAttack={initiateAttack}
                            initiateMove={initiateMove} 
                        />
                    </MiniMap>
                    <Controls />
                </div>
                <div className="mt-1 mb-1 border-accent border-2">
                    <TransformComponent>
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
                    </TransformComponent>
                </div>
            </TransformWrapper>
        </div>
    )
}

export default Globe