interface PlayerSlotSelectorProps {
    playerSlots: number[];
    selectedPlayerSlots: number[];
    setSelectedPlayerSlots: (selectedPlayerSlots: number[]) => void;
}

const PlayerSlotSelector: React.FC<PlayerSlotSelectorProps> = ({ playerSlots,
    selectedPlayerSlots,
    setSelectedPlayerSlots
}) => {
    const handleToggle = (playerID: number) => {
        const isSelected = selectedPlayerSlots.includes(playerID);
        if (isSelected) {
            setSelectedPlayerSlots(selectedPlayerSlots.filter((id) => id !== playerID))
        } else {
            setSelectedPlayerSlots([...selectedPlayerSlots, playerID]);
        }
    }
    
    return (
        <div>
            <p>Select Player Slots to Control:</p>
            {playerSlots.map((id) => (
                <label key={id} style={{ display: "block", marginBottom: "6px"}}>
                    <input
                        type="checkbox"
                        checked={selectedPlayerSlots.includes(id)}
                        onChange={() => handleToggle(id)}
                    />
                    Player Slot {id}
                </label>
            ))}
        </div>
    )
}

export default PlayerSlotSelector