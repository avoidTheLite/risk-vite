import riskLogo from './assets/risk.png'
import './App.css'
import GameState from './game/gameState'

function App() {

  return (
    <>
      <div>
        <a href="https://www.hasbro.com/common/instruct/risk.pdf" target="_blank">
          <img src={riskLogo} className="logo" alt="Risk logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Click the Risk Logo above to read the rules of the game
      </p>
      <GameState>
      </GameState>
    </>
  )
}

export default App
