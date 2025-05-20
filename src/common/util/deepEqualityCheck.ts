import { Player, Turn } from "../../common/types";
import Globe from "../../components/Globe/Globe";
import { type Country } from "../../components/Globe/GameMap";


function isEqualTurn(a: Turn, b: Turn) {
    return (
        a.turn === b.turn &&
        a.phase === b.phase &&
        a.turnTracker.phase === b.turnTracker.phase &&
        a.turnTracker.earnedCard === b.turnTracker.earnedCard &&
        a.turnTracker.armiesEarned === b.turnTracker.armiesEarned &&
        a.activePlayerIndex === b.activePlayerIndex
    )
}

function isEqualCountries(a: Country[], b: Country[]) {
    if (a.length !== b.length) {
        return false
    }
    for (let i = 0; i < a.length; i++) {
        if (
            a[i].id !== b[i].id ||
            a[i].ownerID !== b[i].ownerID ||
            a[i].color !== b[i].color ||
            a[i].armies !== b[i].armies ||
            a[i].isSelectable !== b[i].isSelectable
        ) {
            console.log(`Countries are not equal at index ${i}: ${JSON.stringify(a[i])} !== ${JSON.stringify(b[i])}`)
            return false
        }
    }
    return true
}

function isEqualPlayers(a: Player[], b: Player[]) {
    if (a.length !== b.length) {
        return false
    }
    for (let i = 0; i < a.length; i++) {
        if (
            a[i].id !== b[i].id ||
            a[i].name !== b[i].name ||
            a[i].color !== b[i].color ||
            a[i].armies !== b[i].armies
        ) {
            return false
        }
    }
    return true
}

function isEqualGlobe(a: Globe, b: Globe) {
    
    if (
        a.id !== b.id ||
        a.name !== b.name ||
        a.playerMax !== b.playerMax
    )  {
        return false
    }
    
    if (!isEqualTurn(a.turnData, b.turnData)) {
        return false
    }
    
    if (!isEqualCountries(a.countries, b.countries)) {
        return false
    }
    
    if (!isEqualPlayers(a.players, b.players)) {
        return false
    }
    
    return true
}

export {
    isEqualTurn,
    isEqualCountries,
    isEqualPlayers,
    isEqualGlobe
}