import React from "react"
import Board from "./board"

export default class Game extends React.Component {
  constructor({ gametype }) {
    super()
    this.state = {
      positions: Array(gametype.width * gametype.height).fill().map(gametype.positions),
      fallenSoldiers: null,
      currentDrag: null,
      currentOver: null,
      test: null,
    }
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.positions !== nextState.positions || this.state.fallenSoldiers !== nextState.fallenSoldiers
  }

  canMovePiece(from, to) {
    return true
  }

  movePiece(from, to) {
    if (from === to) return
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

    if (this.canMovePiece(from, to)) this.movePiece(from, to)
    this.setState({ currentDrag: null, currentOver: null, test: to })
    console.log(this.state)
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.test % 2 === 0 ? 'green' : 'blue'}}>
        <Board flip={false} game={this} positions={this.state.positions} over={this.state.currentOver} gametype={this.props.gametype} />
      </div>
    )
  }
}