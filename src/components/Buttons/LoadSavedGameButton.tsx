import React from "react";
import { Button } from "@/components/ui/button";

interface LoadSavedGameButtonProps {
    loadGame: () => void
}
export const LoadSavedGameButton: React.FC<LoadSavedGameButtonProps> = ({loadGame}) => {
    return <Button onClick={loadGame}>Load Saved Game</Button>
}