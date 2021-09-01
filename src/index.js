import "./index.css"

import React from "react"
import { render } from "react-dom"

import Game from "./components/game"
import { RandomCheckers } from "./games/test"
import { RussianCheckers, InternationalCheckers } from "./games/checkers"


function App() {
  return (
    <Game gametype={new InternationalCheckers()} flip={true} />
  )
}

render(<App />, document.getElementById("root"))
