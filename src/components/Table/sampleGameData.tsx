import { LoadGameData } from "../../common/types"



const sampleGameData: LoadGameData[] = [
    {
        saveName: "test save 1",
        id: "test",
        playerCount: 2,
        playerSlots: [1],
        openSlots: 1,
        globeID: "test",
        turn: 1,
        phase: "deploy",
        name: "test 1"
    },
    {
        saveName: "test save 2",
        id: "test2",
        playerCount: 4,
        playerSlots: [2, 3],
        openSlots: 2,
        globeID: "test",
        turn: 1,
        phase: "deploy",
        name: "test 2"
    }
]

export default sampleGameData