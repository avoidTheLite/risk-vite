import {useMemo } from "react";
import { GameData, CountryData, Turn, Player } from "../common/types";
import Globe from "../components/Globe/Globe";
import Country from "../components/Country/Country";

interface SafeGameState extends GameData {
    countries: Country[];
    activePlayerIndex: number;
    turnData: Turn;
}

interface SafeGlobe extends Globe {
    countries: Country[];
    turnData: Turn;
    players: Player[];
}


export function useGameReady(
    gameState: GameData | null,
    globe: Globe | null
): {
    isReady: boolean;
    safeGameState: SafeGameState | null;
    safeGlobe: SafeGlobe | null;
} {
    const result = useMemo(() => {
        if (
            !gameState ||
            !Array.isArray(gameState.countries) ||
            gameState.countries.length === 0 ||
            typeof gameState.activePlayerIndex !== "number" ||
            typeof gameState.saveName !== "string"
        ) {
            return {isReady: false, safeGameState: null, safeGlobe: null};
        }

        if (!globe ||
            !Array.isArray(globe.countries) ||
            globe.countries.length === 0 ||
            typeof globe.turnData?.turn !== "number"
        ) {
            return {isReady: false, safeGameState: null, safeGlobe: null};
        }

        return {
            isReady: true,
            safeGameState: gameState as SafeGameState,
            safeGlobe: globe as SafeGlobe
        };
    }, [gameState, globe]);

    return result;
}
