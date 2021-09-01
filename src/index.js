import "./index.css"

import React from "react"
import { render } from "react-dom"

import { gameTypes } from "./components/settings"
import Game from "./components/game"


function App() {
  return (
    <Game gametype={gameTypes.INTERNATIONAL} />
  )
}

render(<App />, document.getElementById("root"))
