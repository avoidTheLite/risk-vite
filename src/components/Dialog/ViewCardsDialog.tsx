import React, { useState, useEffect } from "react";
import './dialog.css'
import { Button } from "@/components/ui/button";
import Card from "../Card/Card";
import { CardData } from "@/common/types";



interface CardsProps {
    cards: CardData[]
    selectedCards: CardData[]
    selectCard: (id: number) => void
}

const Cards: React.FC<CardsProps> = ({cards, selectedCards, selectCard}) => {
    return (
        <div className="block items-stretch align-middle">
            {cards.map((card) => {
                return <Card 
                    card={card}
                    isSelected={selectedCards.find(selectedCard => selectedCard.id === card.id) ? true : false}
                    selectCard={selectCard}
                    />
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
    const [validMatch, setValidMatch] = useState<boolean>(false);

    function selectCard(id: number) {
        if (selectedCards.find(card => card.id === id)) {
            setSelectedCards(selectedCards.filter(card => card.id !== id));
        } else {
            setSelectedCards([...selectedCards, playerCards.find(card => card.id === id)!]);
        }
    }
    useEffect(() => {
        if (selectedCards.length === 3) {
            if (selectedCards.find(card => card.symbol === "wildcard")) {
                setValidMatch(true);
            } else {
                if (selectedCards[0].symbol === selectedCards[1].symbol && selectedCards[1].symbol === selectedCards[2].symbol) {
                    setValidMatch(true);
                } else {
                    if (selectedCards[0].symbol !== selectedCards[1].symbol && 
                        selectedCards[1].symbol !== selectedCards[2].symbol && 
                        selectedCards[0].symbol !== selectedCards[2].symbol) {
                        setValidMatch(true);
                    }
                }
            }
        } else {
            setValidMatch(false);
        }
    }, [selectedCards])

    if (!isVisible || !playerCards) {
        return null;
    }
    return (
        <div className="dialog-container">
            <dialog className="dialog">
                <h2>View Cards</h2>
                <div>
                    <Cards 
                        cards={playerCards}
                        selectedCards={selectedCards}
                        selectCard={selectCard}
                        ></Cards>
                </div>
                <br/>
                <Button onClick={() => submitCardMatch(selectedCards)} disabled={!validMatch}>Submit Card Match</Button>
                <Button onClick={cancel}>Cancel</Button>
            </dialog>
        </div>
    )
}

export default ViewCardsDialog