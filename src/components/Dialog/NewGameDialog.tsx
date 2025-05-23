import { useEffect, useState } from "react";
import React from "react";
import { GameOptions, Player } from "../../common/types";
import './dialog.css'
import { Button } from "@/components/ui/button";

// interface NewGameDialog {
//     isVisible: boolean
//     confirmNewGame: (options: GameOptions, players: Player[]) => void
// }

interface NewGameDialogProps {
    isVisible: boolean;
    confirmNewGame: (options: GameOptions, players: Player[]) => void;
    cancel: () => void;
}

interface PlayerInputProps {
    index: number;
    name: string;
    color: string;
    onChangeName: (index: number, name: string) => void;
    onChangeColor: (index: number, color: string) => void;
    players: Player[];
}

const supportedColors = ["red", "blue", "green", "yellow", "purple", "orange", "teal", "pink"];

const colorLabels: Record<string, string> = {
    red: "🔴 Red",
    blue: "🔵 Blue",
    green: "🟢 Green",
    yellow: "🟡 Yellow",
    purple: "🟣 Purple",
    orange: "🟠 Orange",
    teal: "🟦 Teal",
    pink: "🌸 Pink",
}


function PlayerInput({ index, name, color, onChangeName, onChangeColor, players }: PlayerInputProps) {
    const takenColors = players
    .map((player, i) => (i === index ? null : player.color))
    .filter(Boolean);
    return ( 
        <div>
            <label className="label">Player {index}:</label><br/>
            Name:
            <input type="text" value={name} onChange={(e) => onChangeName(index, e.target.value)}/>
            <br/>
            Color:
            <select value={color} onChange={(e) => onChangeColor(index, e.target.value)}>
                <option value="">Select Color</option>
                    {supportedColors.map((c) => (
                        <option key={c} value={c} disabled={takenColors.includes(c)}>
                            {colorLabels[c] || c}
                        </option>
                    ))}
            </select>
            <br/>
        </div>
    );
}

const NewGameDialog: React.FC<NewGameDialogProps> = ({isVisible, confirmNewGame, cancel}) => {

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        randomAssignment: false,
        neutralArmies: false
    })

    const [playerCount, setPlayerCount] = useState(2)

    const [players, setPlayers] = useState<Player[]>([
        { id: 0, name: "", color: "", armies: 0 },
        { id: 1, name: "", color: "", armies: 0 }
    ]);

    useEffect(() => {
        const updated = [...players];
        if (playerCount > players.length) {
            for (let i = players.length; i < playerCount; i++) {
                updated.push({ id: i, name: "", color: "", armies: 0 });
            }
        } else {
            updated.length = playerCount;
        }
        setPlayers(updated); 
    }, [playerCount]);

    const handleNameChange = (index: number, name: string) => {
        const updated = [...players];
        updated[index].name = name;
        setPlayers(updated);
    }

    const handleColorChange = (index: number, color: string) => {
        const updated = [...players];
        updated[index].color = color;
        console.log(`Updated player ${index} color to ${color}`);
        setPlayers(updated);
    }

    const startGame = () => {
        const usedColors = new Set<string>();

        const finalizedPlayers = players.map((player) => {
            let color = player.color;
            if (!color || usedColors.has(color)) {
                const availableColor = supportedColors.find((c) => !usedColors.has(c));
                if (availableColor) {
                    color = availableColor;
                }
            }
            usedColors.add(color);
            return {
                ...player,
                color
            }
    });
        confirmNewGame(gameOptions, finalizedPlayers);
    }
    if (!isVisible) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className={`dialog`}
                role="dialog"
                id="new-game-dialog"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                aria-modal="true">
                <h1 id="dialog-title"className='heading'>New Game Setup</h1>
                <p id="dialog-description">
                    Create a new game with the following options
                </p>
                    Number of Players:
                <input 
                    type="number" 
                    value={playerCount}
                    min={2}
                    max={6}
                    onChange={(e) => setPlayerCount(parseInt(e.target.value, 10))}
                    />
                <br/>
                {players.map((player, index) => (
                    <PlayerInput 
                    key={index}
                    index={index}
                    name={player.name}
                    color = {player.color}
                    onChangeName={handleNameChange}
                    onChangeColor={handleColorChange}
                    players={players}
                    />
                ))}
                <></>
                <br/>
                <input className="m-1" type="checkbox" id="randomAssignment" checked={gameOptions.randomAssignment} onChange={(e) => setGameOptions({...gameOptions, randomAssignment: e.target.checked})} />
                <label htmlFor="randomAssignment">Random Assignment</label>
                <br/>
                <input className="m-1" type="checkbox" id="neutralArmies" checked={gameOptions.neutralArmies} onChange={(e) => setGameOptions({...gameOptions, neutralArmies: e.target.checked})} />
                <label htmlFor="neutralArmies">Neutral Armies</label>
                <br/>
                <hr/>   
                <Button onClick={startGame}>Start Game</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )

}

export default NewGameDialog