import React from "react"
import Board from "../components/board"

export default class Game extends React.Component {
  constructor({ gametype }) {
    super()
    this.gametype = gametype
    this.state = {
      positions: Array(gametype.width * gametype.height).fill().map(gametype.positions),
      fallenSoldiers: null,
      currentDrag: null,
      currentOver: null,
      test: null,
    }
  }

  canMovePiece(from, to) {
    return from !== to && this.gametype.isMoveAllowed(from, to)
  }

  canMovePieceTo(to) {
    return this.canMovePiece(this.state.currentDrag, to)
  }

  movePiece(from, to) {
    const positions = [...this.state.positions]
    positions[to] = positions[from]
    positions[from] = null
    this.setState({ positions: positions })
  }

  handleStartDrag(squareID) {
    this.setState({ currentDrag: squareID })
    console.log(this.state)
  }

  handleOver(squareID) {
    this.setState({ currentOver: squareID })
  }

  handleEndDrag() {
    const from = this.state.currentDrag
    const to = this.state.currentOver

    if (this.canMovePieceTo(to)) this.movePiece(from, to)
    this.setState({ currentDrag: null, currentOver: null, test: to })
    console.log(this.state)
  }

  render() {
    console.log("Game was (re-)rendered")
    return (
      <div>
        <Board
          flip={false}
          game={this}
          gametype={this.gametype}
          positions={this.state.positions}
          currentOver={this.state.currentOver}
          currentDrag={this.state.currentOver}
        />
      </div>
    )
  }
}