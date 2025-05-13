import '../Globe/Globe.css'
import { Button } from "@/components/ui/button"
import { CardData } from "@/common/types"


interface ViewCardsButtonProps {
    viewCards: (playerID: number) => void
    playerID: number
    playerCards: CardData[]
}
const ViewCardsButton: React.FC<ViewCardsButtonProps> = ({viewCards, playerID, playerCards}) => {
    return (
        <Button className="top-0" onClick={() =>{viewCards(playerID)}} >View Cards</Button>
    )
}

export default ViewCardsButton