import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type GameMenuButtonProps = {
    newGame: () => void;
    openGame?: () => void;
    quitGame?: () => void;
    loadGame?: () => void;
  };

export function GameMenuButton(
    {
        newGame,
        openGame,
        quitGame,
        loadGame
    }
: GameMenuButtonProps) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Game</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={openGame}>
              Open Game
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={newGame}>
              New Game
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={loadGame}>
              Load Game
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={quitGame}>
              Quit Game
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }