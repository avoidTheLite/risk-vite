import { CountryData } from "../types";
import { Country } from "../../components/Globe/GameMap";

export default function transformCountry(
    raw: CountryData,
): Country {
    return {
        ...raw,
        isSelected: false,
        isTargetable: false,
    };
    
}