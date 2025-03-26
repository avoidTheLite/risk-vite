import "./Country.css"
import { CountryData } from "../../common/types"
interface Country extends CountryData {
    isSelected: boolean;
    isTargetable: boolean;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void
}

export type CountryMethods = {
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void
}



function Country({
    name,
    id,
    color,
    armies,
    isSelected,
    isTargetable,
    clearTargets,
    highlightTargets,
    updateCountries,
    initiateAttack,}: {
        name: string,
        id: number,
        color: string,
        armies: number,
        isSelected: boolean,
        isTargetable: boolean,
        clearTargets: () => Country[],
        highlightTargets: (id: number ) => Country[],
        updateCountries: (newCountries: Country[]) => void,
        initiateAttack: (id: number) => void }) {
    function selectCountry(id: number) {
        if (isSelected) {
            const targetableCountries = clearTargets();
            targetableCountries[id].isSelected = false;
            updateCountries(targetableCountries);
        } else {
            if (isTargetable) {
                initiateAttack(id);

            } else {
            const targetableCountries = highlightTargets(id);
            targetableCountries[id].isSelected = true;
            updateCountries(targetableCountries);
        }}
    }



    return (
        <>
            <button className={`country ${isSelected ? 'isSelected' :isTargetable ? 'istargetable' : color}`} onClick={() => selectCountry(id)}>
                {id}: {name} | Armies = {armies}
            </button>
        </>
    );
}

export default Country