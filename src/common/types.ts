export interface CountryData {
    id: number;
    name: string;
    continent: string;
    connectedTo: number[];
    ownerID: number;
    color: string;
    armies: number;
}

export interface GameData {
    saveName: string;
    id: string;
    players: Player[];
    countries: CountryData[];
    continents: Continent[];
    globeID: string;
    turn: number;
    turnTracker: TurnTracker;
    phase: Phase;
    activePlayerIndex: number;
    cardsAvailable: CardData[];
    matches?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
    lastEngagement?: Engagement;
    
}

export interface LoadGameTableData {
    saveName: string;
    playerCount: number;
    openSlots: number;
    globeID: string;
    turn: number;
    phase: Phase;
    name: string;
}

export interface LoadGameData extends LoadGameTableData {
    id: string;
    playerSlots: number[];
}

export type Phase = "deploy" | "play" | "end";

export type TurnPhase = "start" | "deploy" | "combat" | "conquer" | "move" | "end";
interface TurnTracker {
    phase: string,
    earnedCard: boolean,
    armiesEarned: number,
}
export interface Turn {
    turn: number,
    turnTracker: TurnTracker
    phase: string,
    activePlayerIndex: number
}

export interface Player {
    id: number;
    name: string;
    color: string;
    armies: number;
    gameID?: string;
    cards?: CardData[];
}


export interface CardData {
    id: number;
    name: string;
    symbol: "infantry" | "cavalry" | "artillery" | "wildcard";
}
export interface Continent {
    id: number;
    name: string;
    countries: number[];
    armies: number;
}




export interface GameOptions {
    randomAssignment?: boolean;
    neutralArmies?: boolean;
}

export interface Deployment {
    targetCountry: number;
    armies: number;
}

export interface Movement {
    targetCountry: number;
    sourceCountry: number;
    armies: number;
}

export interface Engagement {
    attackingCountry: number;
    defendingCountry: number;
    attackingTroopCount: number;
    defendingTroopCount?: number;
    attackersLost?: number;
    defendersLost?: number;
    attackerRolls?: number[];
    defenderRolls?: number[];
    conquered?: boolean;
}

export enum WsActions {
    NewGame = 'newGame',
    Echo = 'echo',
    InvalidAction = 'invalidAction',
    Deploy = 'deploy',
    EndTurn = 'endTurn',
    Attack = 'attack',
    CardMatch = 'cardMatch',
    Conquer = 'conquer',
    Move = 'move',
    AvailableCommands = 'availableCommands',
}
export interface AvailableCommand {
    action: WsActions;
    playerID: number; 
    available: boolean;
    deployOptions?: Deployment[];
    moveOptions?: Movement[];
    attackOptions?: Engagement[];
    conquerOption?: Engagement;
    cardMatchOptions?: CardData[][];
}

export interface AvailableCommands {
    deploy: AvailableCommand;
    move: AvailableCommand;
    attack: AvailableCommand;
    conquer: AvailableCommand;
    cardMatch: AvailableCommand;
}
export interface WsRequest {
    data: {
        gameID?: string;
        action: WsActions;
        message: string;
        players?: Player[];
        globeID?: string;
        saveName?: string;
        playerID?: number;
        deployment?: Deployment;
        movement?: Movement;
        engagement?: Engagement;
        gameOptions?: GameOptions;
        cards?: CardData[];
    }
}

export interface WsRequestData {
    gameID?: string;
    action: WsActions;
    message: string;
    players?: Player[];
    globeID?: string;
    saveName?: string;
    playerID?: number;
    deployment?: Deployment;
    movement?: Movement;
    engagement?: Engagement;
    gameOptions?: GameOptions;
    cards?: CardData[];
}

export interface WsResponse {
    data: {
        action: string;
        message: string;
        status: string;
        engagement?: Engagement;
        movement?: Movement;
        gameState?: GameData;
        gameOptions?: GameOptions;
        cards?: CardData[];
        availableCommands?: AvailableCommands;
    }
}

