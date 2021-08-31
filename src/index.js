import './index.css'

import React from 'react'

import { gameTypes } from './scripts/settings.js'
import Game from './scripts/game.js'
import Board from './components/board'


function App() {
  return (
    <Board flip={false} game={React.useMemo(() => new Game(), [])} gameType={gameTypes.RUSSIAN} />
  )
}

render(<App />, document.getElementById('root'))
