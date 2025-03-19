import "./Country.css"

interface Country {
    name: string;
    id: number;
    color: string;
    armies: number;
    isSelected: boolean;
    isTargetable: boolean;
    highlightTargets: (id: number ) => Country[];
    clearTargets: () => Country[];
    updateGameState: (newCountries: Country[]) => void;
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
    updateGameState}: {
        name: string,
        id: number,
        color: string,
        armies: number,
        isSelected: boolean,
        isTargetable: boolean,
        clearTargets: () => Country[],
        highlightTargets: (id: number ) => Country[],
        updateGameState: (newCountries: Country[]) => void}) {


    function selectCountry(id: number) {
        console.log(id)
        console.log(isSelected)
        if (isSelected) {
            const targetableCountries = clearTargets();
            targetableCountries[id].isSelected = false;
            updateGameState(targetableCountries);
        } else {

            const targetableCountries = highlightTargets(id);
            targetableCountries[id].isSelected = true;
            updateGameState(targetableCountries);
        }
        
    }



    return (
        <>
            <button className={`country ${isSelected ? 'isSelected' :isTargetable ? 'istargetable' : color}`} onClick={() => selectCountry(id)}>
                <p>{id}: {name} Armies = {armies}</p>
            </button>
        </>
    );
}

export default Country