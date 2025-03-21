import { useState, useEffect, useRef } from "react";
import { GameData } from "../types";
import response from "../util/test/mockState";



const WS_URL = "ws://localhost:8080";

export default function useWebsocket() {
    const [gameState, setGameState] = useState<GameData>(response.data.gameState);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connectWebSocket = () => {
            ws.current = new WebSocket(WS_URL);
            ws.current.onopen = () => {
                console.log("Connected to WebSocket server");
            };
            ws.current.onmessage = (event) => {
                if (event.data == '...connected to risk server') {
                    console.log('...connected to risk server');}
                    else {
                        const newGameState: GameData = JSON.parse(event.data.gameState);
                        setGameState(newGameState);
                }
            };

            ws.current.onclose = () => {
                console.log("Disconnected from WebSocket server");
                setTimeout(connectWebSocket, 3000);
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

        const sendMessage = (data) => {
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({ data }));
            } else {
                console.error("WebSocket is not open");
            }
        };

        return { gameState, sendMessage };
}