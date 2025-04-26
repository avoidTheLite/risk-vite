import '../Globe/Globe.css'
interface EndTurnButton {
    endTurn: () => void
}

interface EndTurnButtonProps {
    endTurn: () => void
}
const EndTurnButton: React.FC<EndTurnButtonProps> = ({endTurn}) => {
    return (
        <button className="overlay-button"onClick={endTurn} >End Turn</button>
    )
}

export default EndTurnButton