import React from "react";
import artillery from "../../assets/artillery.svg";
import cavalry from "../../assets/cavalry.svg";
import infantry from "../../assets/infantry.svg";
import { CardData } from "../../common/types";
import "./Card.css"

interface CardProps {
    card: CardData
}

const Card: React.FC<CardProps> = ({ card }) => {
    if (card.symbol === "wildcard") {
        return (
            <div key={card.id} className="card">
                <h2 className="text-1xl">Wild Card</h2>
                <div className="w-[5vh]">
                    <img 
                        src={infantry} alt={card.symbol} />
                    <img 
                        src={cavalry} alt={card.symbol} />
                    <img 
                        src={artillery} alt={card.symbol} />
                </div>
            </div>
        )
    }
    return (
        <div key={card.id} className="card">
            <h2 className="text-1xl">{card.name}</h2>
            <div className="w-[10vh]">
                <img 
                    src={card.symbol === "artillery" ? artillery : card.symbol === "cavalry" ? cavalry : infantry} 
                    alt={card.name}
                    width="fill"
                    height="auto" />
            </div>
        </div>
    );
}

export default Card