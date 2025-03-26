
interface EndTurnButton {
    endTurn: () => void
}

interface EndTurnButtonProps {
    endTurn: () => void
}
const EndTurnButton: React.FC<EndTurnButtonProps> = ({endTurn}) => {
    return (
        <button onClick={endTurn}>End Turn</button>
    )
}

export default EndTurnButton