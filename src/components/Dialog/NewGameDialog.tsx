import { useEffect, useState } from "react";
import React from "react";
import { GameOptions, Player } from "../../common/types";

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
}

function PlayerInput({index, name, color, onChangeName, onChangeColor}: PlayerInputProps) {

    return ( 
        <div>
            <label>Player {index}: {name}. Color: {color}</label><br/>
            Name:
            <input type="text" value={name} onChange={(e) => onChangeName(index, e.target.value)}/>
            Color:
            <input type="text" value={color} onChange={(e) => onChangeColor(index, e.target.value)}/>
            <br/>
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
        setPlayers(updated);
    }

    const startGame = () => {
        confirmNewGame(gameOptions, players);
    }

    return (
        <dialog className={`dialog ${isVisible ? 'visible' : 'hidden'}`}>
            <h2>New Game Setup</h2>
            <label>Number of Players</label>
            <input type="number" 
                value ={playerCount}
                min={2}
                max={6}
                onChange={(e) => setPlayerCount(parseInt(e.target.value, 10))}
            />
            <br/> <br/>
            {players.map((player, index) => (
                <PlayerInput 
                    key={index}
                    index={index}
                    name={player.name}
                    color = {player.color}
                    onChangeName={handleNameChange}
                    onChangeColor={handleColorChange}
                />
            ))}
            <></>
            <br/>
            <input type="checkbox" id="randomAssignment" checked={gameOptions.randomAssignment} onChange={(e) => setGameOptions({...gameOptions, randomAssignment: e.target.checked})} />
            <label htmlFor="randomAssignment">Random Assignment</label>
            <input type="checkbox" id="neutralArmies" checked={gameOptions.neutralArmies} onChange={(e) => setGameOptions({...gameOptions, neutralArmies: e.target.checked})} />
            <label htmlFor="neutralArmies">Neutral Armies</label>
            <br/>
            <hr/>   
            <button onClick={startGame}>Start Game</button>
            <button onClick={cancel}>Cancel</button>
        </dialog>
    )

}

export default NewGameDialog