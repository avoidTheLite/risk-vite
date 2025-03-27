import "./Country.css"
import { CountryData } from "../../common/types"
interface Country extends CountryData {
    isSelected: boolean;
    isTargetable: boolean;
    activePlayerIndex: number;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void
    initiateMove: (id: number) => void
}

export type CountryMethods = {
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateCountries: (newCountries: Country[]) => void;
    initiateAttack: (id: number) => void
    initiateMove: (id: number) => void
}



function Country({
    name,
    id,
    color,
    armies,
    ownerID,
    activePlayerIndex,
    isSelected,
    isTargetable,
    clearTargets,
    highlightTargets,
    updateCountries,
    initiateAttack,
    initiateMove}: {
        name: string,
        id: number,
        color: string,
        armies: number,
        ownerID: number,
        activePlayerIndex: number,
        isSelected: boolean,
        isTargetable: boolean,
        clearTargets: () => Country[],
        highlightTargets: (id: number ) => Country[],
        updateCountries: (newCountries: Country[]) => void,
        initiateAttack: (id: number) => void,
        initiateMove: (id: number) => void}) {
    function selectCountry(id: number) {
        if (isSelected) {
            const targetableCountries = clearTargets();
            targetableCountries[id].isSelected = false;
            updateCountries(targetableCountries);
        } else {
            if (isTargetable) {
                if (ownerID !== activePlayerIndex) {
                    initiateAttack(id);
                } else {
                    initiateMove(id);
                }

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