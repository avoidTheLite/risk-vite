import { CountryData } from "../types";
import { default as Country, CountryMethods } from "../../components/Country/Country";

export default function transformCountry(
    raw: CountryData,
    methods: CountryMethods
): Country {
    return {
        ...raw,
        isSelected: false,
        isTargetable: false,
        ...methods,
    };
    
}