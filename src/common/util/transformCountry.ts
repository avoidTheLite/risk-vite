import { CountryData, Turn } from "../types";
import { Country } from "../../components/Globe/GameMap";

export default function transformCountry(
    raw: CountryData,
    activePlayerIndex: number,
    turnData: Turn
): Country {
    if ((turnData.phase === "deploy") || (turnData.turnTracker.phase === "deploy")) {
        return {
            ...raw,
            isSelected: false,
            isSelectable: raw.ownerID === activePlayerIndex,
            isTargetable: false,
        };
    }
    return {
        ...raw,
        isSelected: false,
        isSelectable: (raw.ownerID === activePlayerIndex) && (raw.armies > 1),
        isTargetable: false,
    };
    
}