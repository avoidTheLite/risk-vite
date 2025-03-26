import { useEffect, useState, useMemo, useCallback, useRef } from "react";
// import response from "../common/util/test/mockState";
import mockAvailableCommands from "../common/util/test/mockAvailableCommands-deploy";
import "./gameState.css";
import { default as Country, CountryMethods } from "../components/Country/Country";
import Globe from "../components/Globe/Globe";
import { Turn, CountryData, GameOptions, Player, GameData, WsActions } from "../common/types";
import DeployDialog from "../components/Dialog/DeployDialog";
import AttackDialog from "../components/Dialog/AttackDialog";
import useWebsocket from "../common/util/useWebsocket";
import transformCountry from "../common/util/transformCountry";
import EndTurnButton from "../components/Buttons/EndTurnButton";
import NewGameButton from "../components/Buttons/NewGameButton";
import NewGameDialog from "../components/Dialog/NewGameDialog";
import { useGameReady } from "../hooks/useGameReady";
import { isEqualCountries, isEqualTurn, isEqualGlobe, isEqualPlayers } from "../common/util/deepEqualityCheck";
import ConquerDialog from "../components/Dialog/ConquerDialog";

const initialAvailableCommands = mockAvailableCommands.data.availableComands

export default function GameState() {
    const { gameState, sendMessage } = useWebsocket();
    const [countries, setCountries] = useState<Country[] | null>(null);
    const [turnData, setTurnData] = useState<Turn | null>(null)
    const [availableCommands, setAvailableCommands] = useState(initialAvailableCommands);
    const [globe, setGlobe] = useState<Globe | null>(null);
    const [deployDialogVisible, setDeployDialogVisible] = useState(false);
    const [deployTarget, setDeployTarget] = useState<number>(-1);
    const attackingCountry = useRef<number | null>(null);
    const defendingCountry = useRef<number | null>(null);
    const [attackDialogVisible, setAttackDialogVisible] = useState(false);
    const [newGameDialogVisible, setNewGameDialogVisible] = useState(false);
    const [conquerDialogVisible, setConquerDialogVisible] = useState(false);
    const { isReady, safeGameState, safeGlobe } = useGameReady(gameState, globe);

    
    const updateCountries = useCallback((newCountries: Country[]) => {
        setCountries(newCountries);
    }, []);

    function updateAvailableCommands(newAvailableCommands: string[]) {
        setAvailableCommands(newAvailableCommands);
    }

    function hasStartedGame(gameState: GameData | null, globe: Globe | null): gameState is GameData & {
        countries: Country[];
        activePlayerIndex: number;
        saveName: string;
    }{
        return !!gameState && Array.isArray(gameState.countries) && gameState.countries.length > 0 && !!globe;
    }

    const clearTargets = useCallback(() => {
        if(!isReady || !safeGameState) return [];
        const targetableCountries: Country[] = safeGameState.countries.map((country: Country) => ({
            ...country,
            isTargetable: false,
            isSelected: false}
        ));
        setAttackDialogVisible(false);
        return targetableCountries
    }, [isReady, safeGameState]);

    const highlightTargets = useCallback((id: number) => {
        let targetableCountries: Country[]
        if (!countries || !turnData) return [];
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
    
    function confirmDeploy(id: number, troopCount: number) {
        if (!countries || !gameState) return;
        console.log("Deploying troops to " + countries[id].name);
        const deployMessage = {
            action: "deploy" as WsActions,
            message: "Deploying troops to " + countries[id].name,
            playerID: gameState.activePlayerIndex,
            deployment: {
                targetCountry: id,
                armies: troopCount
            },
            saveName: gameState.saveName
        }
        sendMessage(deployMessage);
        setDeployDialogVisible(false);
    }

    const initiateAttack = useCallback((id: number) => {
        if (!countries) return;
        defendingCountry.current = id;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].isSelected == true) {
                attackingCountry.current = i;
            }
        }
        setAttackDialogVisible(true);
    }, [countries]);


    function confirmAttack(troopCount: number) {
        if (!countries || !gameState) return;
        console.log('trying to attack')
        console.log(`attacking country: ${attackingCountry.current}, defending country: ${defendingCountry.current}`)
        if (attackingCountry.current != null && attackingCountry.current != undefined &&
            defendingCountry.current != null && defendingCountry.current != undefined) {
            console.log("Attacking " + countries[defendingCountry.current].name);
            const attackMessage = {
                action: "attack" as WsActions,
                message: "Attacking " + countries[defendingCountry.current].name + " from " + countries[attackingCountry.current].name,
                playerID: gameState.activePlayerIndex,
                engagement: {
                    attackingCountry: attackingCountry.current,
                    defendingCountry: defendingCountry.current,
                    attackingTroopCount: troopCount
                },
                saveName: gameState.saveName
            }
            sendMessage(attackMessage);
            setAttackDialogVisible(false);
        } else {
            console.log("No country selected");
        }
        
    }
    function confirmConquer(troopCount: number) {
        if (!countries || !gameState) return;
        console.log('trying to conquer')
        console.log(`attacking country: ${attackingCountry.current}, defending country: ${defendingCountry.current}`)
        if (attackingCountry.current != null && attackingCountry.current != undefined &&
            defendingCountry.current != null && defendingCountry.current != undefined) {
            console.log("Conquering " + countries[defendingCountry.current].name);
            const conquerMessage = {
                action: "conquer" as WsActions,
                message: "Conquering " + countries[defendingCountry.current].name + " from " + countries[attackingCountry.current].name,
                playerID: gameState.activePlayerIndex,
                engagement: {
                    attackingCountry: attackingCountry.current,
                    defendingCountry: defendingCountry.current,
                    attackingTroopCount: troopCount,
                    conquered: true
                },
                saveName: gameState.saveName
            }
            sendMessage(conquerMessage);
            setAttackDialogVisible(false);
        } else {
            console.log("No country selected");                        
        }
    }

    function newGame() {
        setNewGameDialogVisible(true);
    }

    function confirmNewGame(gameOptions: GameOptions, players: Player[]) {
        console.log('starting new game')
        const newGameMessage = {
            action: "newGame" as WsActions,
            message: "New Game",
            players: players,
            globeID: "defaultGlobeID",
            gameOptions: gameOptions
        }
        sendMessage(newGameMessage);
        setNewGameDialogVisible(false);
    }

    function endTurn() {
        if (!hasStartedGame(gameState, globe)) return;
        console.log("ending turn");
        const endTurnMessage = {
            action: "endTurn" as WsActions,
            message: "End Turn",
            playerID: gameState.activePlayerIndex,
            saveName: gameState.saveName
        }
        sendMessage(endTurnMessage);
    }

    const countryMethods: CountryMethods = useMemo(() => ( {
        highlightTargets,
        clearTargets,
        updateCountries,
        initiateAttack
    }), [highlightTargets, clearTargets, updateCountries, initiateAttack]);

    function cancel(): void {
        setDeployDialogVisible(false);
        setAttackDialogVisible(false);
        setNewGameDialogVisible(false);
        setConquerDialogVisible(false);
    }

    useEffect(() => {
        
        if (!gameState || !gameState.countries) return;
        const newCountries: Country[] = gameState.countries.map((country: CountryData) => 
            transformCountry(country, countryMethods)  
        );
        const newTurnData: Turn = {
            turn: {...gameState}.turn,
            turnTracker: {...gameState.turnTracker},
            phase: {...gameState}.phase,
            activePlayerIndex: {...gameState}.activePlayerIndex,
        }
        const newPlayers = {...gameState.players};
        const newGlobe: Globe = {
            id: gameState.globeID,
            name: 'Earth',
            playerMax: 6,
            turnData: newTurnData,
            players: newPlayers,
            countries: newCountries
        }
        if (!turnData || !isEqualTurn(turnData, newTurnData)) {
            setTurnData({...newTurnData});
        } 
        if (!countries || !isEqualCountries(newCountries, countries)) {
            setCountries([...newCountries]);
            } 
        if (!globe || !isEqualGlobe(globe, newGlobe)) {
            setGlobe(newGlobe);
        }
        if (gameState.turnTracker.phase === 'conquer') {
            setConquerDialogVisible(true);
        }
        if (gameState.turnTracker.phase === 'combat') {
            setConquerDialogVisible(false);
        }

    }, [gameState, countryMethods, countries, turnData]);

    if (!isReady || !safeGameState || !safeGlobe || !Array.isArray(countries)) {
        console.log(`countries: ${JSON.stringify(countries)}`);
        return (
            <>
                <NewGameDialog
                    isVisible={newGameDialogVisible}
                    confirmNewGame={confirmNewGame}
                    cancel={cancel}
                />
                <NewGameButton 
                    newGame={newGame}
                    
                />
                <div>Waiting to Start game...</div>
            </>
        );
    } else {
    return (
        <div className="globe" key = {safeGlobe.id}>
            <NewGameButton 
                newGame={newGame}
            />
            <NewGameDialog
                isVisible={newGameDialogVisible}
                confirmNewGame={confirmNewGame}
                cancel={cancel}
            />
            <EndTurnButton 
                endTurn={endTurn} 
            /> <br/>
            GameID = {safeGameState.id} <br/>
            Save Name = {safeGameState.saveName} <br/>
            <Globe 
                id={safeGlobe.id}
                name={safeGlobe.name}
                playerMax={safeGlobe.playerMax}
                turnData={safeGlobe.turnData}
                players={safeGameState.players}
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
                cancel={cancel}
                deployTarget={deployTarget}
                />
            </div>
            <div>
            <AttackDialog
                isVisible={attackDialogVisible}
                confirmAttack={confirmAttack}
                cancel={cancel}
            />
            <ConquerDialog 
                isVisible={conquerDialogVisible}
                confirmConquer={confirmConquer}
                cancel={cancel}
            />
            </div>
        </div>
    )
}}


