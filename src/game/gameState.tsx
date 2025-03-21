import { useEffect, useState, useMemo, useCallback } from "react";
import response from "../common/util/test/mockState";
import mockAvailableCommands from "../common/util/test/mockAvailableCommands-deploy";
import "./gameState.css";
import { default as Country, CountryMethods } from "../components/Country/Country";
import Globe from "../components/Globe/Globe";
import { Turn, CountryData } from "../common/types";
import DeployDialog from "../components/Dialog/DeployDialog";
import AttackDialog from "../components/Dialog/AttackDialog";
import useWebsocket from "../common/util/useWebsocket";
import transformCountry from "../common/util/transformCountry";

// temporary turnData until ws is connected:
const initialCountries = response.data.gameState.countries
for (let i = 0; i < initialCountries.length; i++) {
    initialCountries[i].isSelected = false;
    initialCountries[i].isTargetable = false;
}

const initialAvailableCommands = mockAvailableCommands.data.availableComands

// temporary turnData until ws is connected:
const initialTurnData = {
    turn: response.data.gameState.turn,
    turnTracker: response.data.gameState.turnTracker,
    phase: response.data.gameState.phase,
    activePlayerIndex: response.data.gameState.activePlayerIndex,
}

// temporary turnData until ws is connected:
const initialGlobe: Globe = {
    id:'defaultGlobeID',
    name: 'Earth',
    playerMax: 6,
    countries: initialCountries
}

export default function GameState() {
    const { gameState, sendMessage } = useWebsocket();
    const [countries, setCountries] = useState(initialCountries);
    const [turnData, setTurnData] = useState(initialTurnData)
    const [availableCommands, setAvailableCommands] = useState(initialAvailableCommands);
    const [globe, setGlobe] = useState(initialGlobe);
    const [deployDialogVisible, setDeployDialogVisible] = useState(false);
    const [deployTarget, setDeployTarget] = useState(9000);
    const [attackDialogVisible, setAttackDialogVisible] = useState(false);

    
    const updateCountries = useCallback((newCountries: Country[]) => {
        setCountries(newCountries);
    }, []);

    function updateTurnData(newTurnData: Turn) {
        setTurnData(newTurnData);
    }

    function updateAvailableCommands(newAvailableCommands: string[]) {
        setAvailableCommands(newAvailableCommands);
    }

    const isEqualCountries = (a: Country[], b: Country[]) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i].id !== b[i].id || a[i].ownerID !== b[i].ownerID || a[i].armies !== b[i].armies) {
                return false   
            } else {
                return true
            }
        }
    }

    const clearTargets = useCallback(() => {
        const targetableCountries: Country[] = countries.map((country: Country) => ({
            ...country,
            isTargetable: false,
            isSelected: false}
        ));
        setAttackDialogVisible(false);
        return targetableCountries
    }, [countries]);

    const highlightTargets = useCallback((id: number) => {
        let targetableCountries: Country[]
        if (turnData.phase === "deploy" || turnData.turnTracker.phase === "deploy") {
            targetableCountries = clearTargets()
            setDeployTarget(id);
            setDeployDialogVisible(!targetableCountries[id].isSelected);
            
        } else {
                targetableCountries = countries.map((country: Country) => {
                    if (countries[id].connectedTo.includes(country.id)) {
                        return {...country, isTargetable: true, isSelected: false};
                    }
                    return {...country, isTargetable: false, isSelected: false};
                });
                setDeployDialogVisible(false);
                setAttackDialogVisible(false);
        }
        
        return targetableCountries
    }, [turnData, countries, clearTargets]);

    const initiateAttack = useCallback((id: number) => {
        let attackingCountry: number;
        const defendingCountry: number = id;
        let attackingTroopCount: number;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].isSelected == true) {
                attackingCountry = i;
            }
        }
        setAttackDialogVisible(true);
    }, [countries]);

    
    function confirmDeploy(id: number, troopCount: number) {
        console.log("Deploying troops to " + countries[id].name);
        const deployMessage = {
            action: "deploy",
            message: "Deploying troops to " + countries[id].name,
            playerID: gameState.activePlayerIndex,
            deployment: {
                targetCountry: id,
                armies: troopCount
            },
            saveName: gameState.saveName
        }
        sendMessage(deployMessage);
    }

    function confirmAttack() {
        // Call attack function and route to websocket
    }

    const countryMethods: CountryMethods = useMemo(() => ( {
        highlightTargets,
        clearTargets,
        updateCountries,
        initiateAttack
    }), [highlightTargets, clearTargets, updateCountries, initiateAttack]);

    useEffect(() => {
        
        if (gameState && gameState.countries) {
            const newCountries: Country[] = gameState.countries.map((country: CountryData) => 
                transformCountry(country, countryMethods)  
            );
            if (!isEqualCountries(newCountries, countries)) {
                setCountries(newCountries);
            }
            setGlobe((prev) => isEqualCountries(prev.countries, newCountries) ? prev : ({...prev, countries: newCountries}));
        }
    }, [gameState, countryMethods]);


    return (
        <div className="globe" key = {globe.id}>
            <Globe 
            id={globe.id}
            name={globe.name}
            playerMax={globe.playerMax}
            countries={countries}
            clearTargets={clearTargets}
            highlightTargets={highlightTargets}
            updateCountries={updateCountries} 
            initiateAttack={initiateAttack}
            />
            <div>
            <DeployDialog
                isVisible={deployDialogVisible}
                confirmDeploy={confirmDeploy}
                deployTarget={deployTarget}
                />
            </div>
            <div>
            <AttackDialog
                isVisible={attackDialogVisible}
                confirmAttack={confirmAttack}
                />
            </div>
        </div>
        
    )


}


