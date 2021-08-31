import './index.css'

import React from 'react'
import { render } from 'react-dom'

import { gameTypes } from './scripts/settings'
import Game from './scripts/game'
import Board from './components/board'


function App() {
  return (
    <Board flip={false} game={React.useMemo(() => new Game(), [])} gameType={gameTypes.RUSSIAN} />
  )
}

render(<App />, document.getElementById('root'))
