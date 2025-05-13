import React, { useState } from "react";
import './dialog.css'
import { Button } from "@/components/ui/button";
import Card from "../Card/Card";
import { CardData } from "@/common/types";



interface CardsProps {
    cards: CardData[]
}

const Cards: React.FC<CardsProps> = ({cards}) => {
    return (
        <div className="block items-stretch align-middle">
            {cards.map((card) => {
                return <Card card={card} />
            })}
        </div>
    )
}

interface ViewCardsDialogProps {
    isVisible: boolean
    submitCardMatch: (selectedCards: CardData[]) => void
    playerCards: CardData[]
    cancel: () => void
}

const ViewCardsDialog: React.FC<ViewCardsDialogProps> = ({isVisible, submitCardMatch, playerCards, cancel}) => {
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

    if (!isVisible || !playerCards) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className="dialog">
                <h2>View Cards</h2>
                <div>
                    <Cards cards={playerCards}></Cards>
                </div>
                <br/>
                <Button onClick={() => submitCardMatch(selectedCards)}>Submit Card Match</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default ViewCardsDialog