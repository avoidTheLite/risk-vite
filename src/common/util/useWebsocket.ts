import { useState, useEffect, useRef } from "react";
import { GameData, LoadGameData , WsRequestData } from "../types";



const WS_URL = "ws://localhost:8080";

export default function useWebsocket() {
    const [gameState, setGameState] = useState<GameData | null>(null);
    const [openGames, setOpenGames] = useState<LoadGameData[]>([]);
    const [savedGames, setSavedGames] = useState<LoadGameData[]>([]);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket(WS_URL);
            ws.current.onopen = () => {
                console.log("Connected to WebSocket server");
            };
            ws.current.onmessage = (event) => {
                if (event.data == '...connected to risk server') {
                    console.log('...connected to risk server');
                } else {
                    if (!event.data || JSON.parse(event.data).data.status == "failure") {
                        console.log(`failure: ${JSON.stringify(JSON.parse(event.data).data.message)}`);
                    } else {
                        if (JSON.parse(event.data).data.action == "viewOpenGames") {
                            setOpenGames(JSON.parse(event.data).data.gameSlots);
                            console.log(`open games: ${JSON.stringify(JSON.parse(event.data).data.gameSlots)}`);
                        } else {
                            if (JSON.parse(event.data).data.action == "viewSavedGames"){
                                setSavedGames(JSON.parse(event.data).data.savedGames);
                                console.log(`saved games: ${JSON.stringify(JSON.parse(event.data).data.savedGames)}`);
                            } else {
                            console.log(JSON.parse(event.data).data);
                            const newGameState: GameData = JSON.parse(event.data).data.gameState;
                            setGameState(newGameState);
                            }
                        }
                    }
                    setUpdateMessage(JSON.parse(event.data).data.message);
                }
            };

            ws.current.onclose = () => {
                console.log("Disconnected from WebSocket server");
                setTimeout(connectWebSocket, 2000);
            };

            ws.current.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        };

        connectWebSocket();

        return () => {
            ws.current?.close();
        }
        }, []);

        const sendMessage = (data: WsRequestData) => {
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ data }));
            } else {
                console.error("WebSocket is not open");
            }
        };

        const closeWebSocket = () => {
            ws.current?.close();
            setGameState(null);
        };

        return { gameState, openGames, savedGames, updateMessage, setUpdateMessage, sendMessage, closeWebSocket };
}