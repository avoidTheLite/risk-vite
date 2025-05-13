import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import riskLogo from '../assets/risk.png';
import mockAvailableCommands from "../common/util/test/mockAvailableCommands-deploy";
import { Country } from "../components/Globe/GameMap";
import Globe from "../components/Globe/Globe";
import { Turn, CountryData, GameOptions, Player, GameData, WsActions } from "../common/types";
import DeployDialog from "../components/Dialog/DeployDialog";
import AttackDialog from "../components/Dialog/AttackDialog";
import useWebsocket from "../common/util/useWebsocket";
import transformCountry from "../common/util/transformCountry";
import NewGameButton from "../components/Buttons/NewGameButton";
import NewGameDialog from "../components/Dialog/NewGameDialog";
import { useGameReady } from "../hooks/useGameReady";
import { isEqualCountries, isEqualTurn, isEqualGlobe } from "../common/util/deepEqualityCheck";
import ConquerDialog from "../components/Dialog/ConquerDialog";
import MoveDialog from "../components/Dialog/MoveDialog";
import ViewGamesButton from "../components/Buttons/ViewGamesButton";
import ViewGamesDialog from "../components/Dialog/ViewGamesDialog";
import OpenGameDialog from "../components/Dialog/OpenGameDialog";
import QuitGameDialog from "../components/Dialog/QuitGameDialog";
import ViewCardsDialog from "@/components/Dialog/ViewCardsDialog";
import { GameMenuButton } from "@/components/Buttons/GameMenuButton";
import { CardData } from "@/common/types";
import ViewSavedGamesDialog from "@/components/Dialog/ViewSavedGamesDialog";
import { LoadSavedGameButton } from "@/components/Buttons/LoadSavedGameButton";

const initialAvailableCommands = mockAvailableCommands.data.availableComands

export default function GameState() {
    const { gameState, openGames, savedGames, sendMessage, closeWebSocket } = useWebsocket();
    const [countries, setCountries] = useState<Country[] | null>(null);
    const [turnData, setTurnData] = useState<Turn | null>(null)
    const [availableCommands, setAvailableCommands] = useState(initialAvailableCommands);
    const [globe, setGlobe] = useState<Globe | null>(null);
    const [deployDialogVisible, setDeployDialogVisible] = useState(false);
    const [deployTarget, setDeployTarget] = useState<number>(-1);
    const attackingCountry = useRef<number | null>(null);
    const defendingCountry = useRef<number | null>(null);
    const sourceCountry = useRef<number | null>(null);
    const targetCountry = useRef<number | null>(null);
    const [attackDialogVisible, setAttackDialogVisible] = useState(false);
    const [newGameDialogVisible, setNewGameDialogVisible] = useState(false);
    const [viewSavedGamesDialogVisible, setViewSavedGamesDialogVisible] = useState(false);
    const [viewGamesDialogVisible, setViewGamesDialogVisible] = useState(false);
    const [conquerDialogVisible, setConquerDialogVisible] = useState(false);
    const [moveDialogVisible, setMoveDialogVisible] = useState(false);
    const [openGameDialogVisible, setOpenGameDialogVisible] = useState(false);
    const [quitGameDialogVisible, setQuitGameDialogVisible] = useState(false);
    const [viewCardsDialogVisible, setViewCardsDialogVisible] = useState(false);
    const [playerCards , setPlayerCards] = useState<CardData[]>([]);
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

    const initiateMove = useCallback((id: number) => {
        if (!countries) return;
        targetCountry.current = id;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].isSelected == true) {
                sourceCountry.current = i;
            }
        }
        setMoveDialogVisible(true);
    }, [countries]);

    function confirmMove(troopCount: number) {
        if (!countries || !gameState) return;
        console.log('trying to move')
        console.log(`attacking country: ${attackingCountry.current}, defending country: ${defendingCountry.current}`)
        if (sourceCountry.current != null && sourceCountry.current != undefined &&
            targetCountry.current != null && targetCountry.current != undefined) {
            console.log("Moving " + countries[targetCountry.current].name);
            const moveMessage = {
                action: "move" as WsActions,
                message: "Moving " + countries[targetCountry.current].name + " from " + countries[sourceCountry.current].name,
                playerID: gameState.activePlayerIndex,
                movement: {
                    sourceCountry: sourceCountry.current,
                    targetCountry: targetCountry.current,
                    armies: troopCount
                },
                saveName: gameState.saveName
            }
            sendMessage(moveMessage);
            setMoveDialogVisible(false);
        }
    }

    function newGame() {
        setNewGameDialogVisible(true);
    }

    function refreshOpenGames() {
        const viewOpenGamesMessage = {
            action: "viewOpenGames" as WsActions,
            message: "View Open Games"
        }
        sendMessage(viewOpenGamesMessage);
    }
    function viewGames() {
        setViewGamesDialogVisible(true);
        refreshOpenGames();
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

    function refreshSavedGames() {
        const viewSavedGamesMessage = {
            action: "viewSavedGames" as WsActions,
            message: "View Saved Games"
        }
        sendMessage(viewSavedGamesMessage);
    }

    function loadGame() {
        setViewSavedGamesDialogVisible(true);
        refreshSavedGames();
    }

    function confirmLoadGame(saveName: string) {
        const loadGameMessage = {
            action: "loadGame" as WsActions,
            message: "Load Game",
            saveName: saveName
        }
        sendMessage(loadGameMessage);
        setViewSavedGamesDialogVisible(false);
    }

    function confirmJoinGame(saveName: string, playerSlots: number[]) {
        console.log('joining game ' + saveName)
        const joinGameMessage = {
            action: "joinGame" as WsActions,
            message: "Join Game",
            saveName: saveName,
            playerSlots: playerSlots
        }
        sendMessage(joinGameMessage);
        setViewGamesDialogVisible(false);
    }
    
    function openGame() {
        setOpenGameDialogVisible(true);
    }

    function quitGame() {
        setQuitGameDialogVisible(true);
    }

    function confirmQuitGame() {
        closeWebSocket();
        setQuitGameDialogVisible(false);
    }

    function confirmOpenGame(playerSlots: number[]) {
        console.log(`Opening game: `+ gameState!.saveName)
        const openGameMessage = {
            action: "openGame" as WsActions,
            message: `Opening game with ${playerSlots.length} open player slots`,
            saveName: gameState!.saveName,
            playerSlots: playerSlots
        }
        sendMessage(openGameMessage);
        setOpenGameDialogVisible(false);
    }

    function viewCards(playerID: number) {
        if (!gameState?.players[playerID].cards) return;
        console.log('Viewing Cards for player ' + playerID)
        setPlayerCards(gameState!.players[playerID].cards);
        setViewCardsDialogVisible(true);
    }

    function submitCardMatch(selectedCards: CardData[]) {
        setViewCardsDialogVisible(false);
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

    function getClassName(id: number): string {
        if (!countries) return "country";
        const country = countries.find(c => c.id === id);
        if (!country) return "country";
        let base = `country ${country.color}`;
        if (country.isSelected) base += " isSelected";
        else if (country.isTargetable) base += " isTargetable";
        return base;
      }

    function cancel(): void {
        setDeployDialogVisible(false);
        setAttackDialogVisible(false);
        setNewGameDialogVisible(false);
        setConquerDialogVisible(false);
        setMoveDialogVisible(false);
        setViewGamesDialogVisible(false);
        setOpenGameDialogVisible(false);
        setQuitGameDialogVisible(false);
        setViewCardsDialogVisible(false);
        setViewSavedGamesDialogVisible(false);
    }

    useEffect(() => {
        
        if (!gameState || !gameState.countries) return;
        const newCountries: Country[] = gameState.countries.map((country: CountryData) => 
            transformCountry(country)  
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

    }, [gameState, countries, turnData]);

    if (!isReady || !safeGameState || !safeGlobe || !turnData || !Array.isArray(countries)) {
        console.log(`countries: ${JSON.stringify(countries)}`);
        return (
            <>
                <div>
                    <a href="https://www.hasbro.com/common/instruct/risk.pdf" target="_blank">
                        <img src={riskLogo} className="logo" alt="Risk logo" />
                    </a>
                </div>
                <p className="read-the-docs">
                    Click the Risk Logo above to read the rules of the game
                </p>
                <h1>Risk: The Board Game</h1>
                <NewGameDialog
                    isVisible={newGameDialogVisible}
                    confirmNewGame={confirmNewGame}
                    cancel={cancel}
                />
                <NewGameButton 
                    newGame={newGame}
                    
                />
                <ViewSavedGamesDialog
                    isVisible={viewSavedGamesDialogVisible}
                    savedGameData={savedGames}
                    refreshSavedGames={refreshSavedGames}
                    confirmLoadGame={confirmLoadGame}
                    cancel={cancel}
                />
                <LoadSavedGameButton
                    loadGame={loadGame}
                />
                <ViewGamesDialog
                    isVisible={viewGamesDialogVisible}
                    openGameData={openGames}
                    refreshOpenGames={refreshOpenGames}
                    confirmJoinGame={confirmJoinGame}
                    cancel={cancel}
                />
                <ViewGamesButton
                    viewGames={viewGames}
                />
                <div>Waiting to Start game...</div>
            </>
        ); 
    } else {
    return (
        <div className="w-full justify-content-center align-self-center align-items-center" key = {safeGlobe.id}>
            <div className="flex flex-wrap justify-between">
                <div className="flex text-sm" >
                    {safeGameState.saveName} <br/>
                    Globe Name: {safeGlobe.name} | Max Players: {safeGlobe.playerMax} <br/>
                    Game Phase: {turnData.phase} <br/>
                </div>
                <div className="globe-info">
                    <span className="globe-content">
                        <div>
                        Turn: {turnData.turn} ({turnData.turnTracker.phase})<br/>
                        </div>
                        {safeGameState.players.map((player) => (
                            <div key={player.id}> 
                                {player.name} | {player.color} | Armies: {player.armies}
                                
                            </div>
                        ))}
                    </span>
                </div>
                <div className="flex justify-between">
                    <GameMenuButton
                        newGame={newGame}
                        openGame={openGame}
                        quitGame={quitGame}
                        loadGame={loadGame}
                    />
                </div>
            </div>
            <NewGameDialog
                isVisible={newGameDialogVisible}
                confirmNewGame={confirmNewGame}
                cancel={cancel}
            />
            <ViewSavedGamesDialog
                    isVisible={viewSavedGamesDialogVisible}
                    savedGameData={savedGames}
                    refreshSavedGames={refreshSavedGames}
                    confirmLoadGame={confirmLoadGame}
                    cancel={cancel}
            />
            <QuitGameDialog
                isVisible={quitGameDialogVisible}
                confirmQuitGame={confirmQuitGame}
                cancel={cancel}
            />
            <OpenGameDialog
                isVisible={openGameDialogVisible}
                confirmOpenGame={confirmOpenGame}
                cancel={cancel}
                playerIDs={safeGameState.players.map((players) => players.id)}
            />
            <br/>
            <Globe
                id={safeGlobe.id}
                turnData={safeGlobe.turnData}
                players={safeGameState.players}
                countries={countries}
                getClassName={getClassName}
                clearTargets={clearTargets}
                highlightTargets={highlightTargets}
                updateCountries={updateCountries} 
                initiateAttack={initiateAttack}
                initiateMove={initiateMove}
                endTurn={endTurn} 
                viewCards={viewCards}
                playerCards={playerCards}
            />
            <div>
            <DeployDialog
                isVisible={deployDialogVisible}
                confirmDeploy={confirmDeploy}
                cancel={cancel}
                deployTarget={deployTarget}
                playerArmies={safeGameState.players[safeGameState.activePlayerIndex].armies}
                />
            </div>
            <div>
            <AttackDialog
                isVisible={attackDialogVisible}
                confirmAttack={confirmAttack}
                cancel={cancel}
                attackingCountry={attackingCountry.current}
                countries={countries}
            />
            <ConquerDialog 
                isVisible={conquerDialogVisible}
                confirmConquer={confirmConquer}
                cancel={cancel}
                attackingCountry={attackingCountry.current}
                countries={countries}
            />
            <MoveDialog 
                isVisible={moveDialogVisible}
                confirmMove={confirmMove}
                cancel={cancel}
                sourceCountry={sourceCountry.current}
                countries={countries}
            />
            <ViewCardsDialog 
                isVisible={viewCardsDialogVisible}
                submitCardMatch={submitCardMatch}
                playerCards={playerCards}
                cancel={cancel}
            />
            </div>
        </div>
    )
}}


