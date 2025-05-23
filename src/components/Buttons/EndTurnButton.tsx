import '../Globe/Globe.css'
import { Button } from "@/components/ui/button"
interface EndTurnButton {
    endTurn: () => void
}

interface EndTurnButtonProps {
    endTurn: () => void
}
const EndTurnButton: React.FC<EndTurnButtonProps> = ({endTurn}) => {
    return (
        <Button className="bottom-0" onClick={endTurn} >End Turn</Button>
    )
}

export default EndTurnButton