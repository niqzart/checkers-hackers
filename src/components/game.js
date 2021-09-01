import React from "react"
import Board from "../components/board"

export default class Game extends React.Component {
  constructor({ gametype, flip }) {
    super()
    const positions = Array(gametype.width * gametype.height).fill().map(gametype.positioning)
    if (flip) positions.reverse(); 

    this.gametype = gametype
    this.state = {
      positions: positions,
      fallen: [],
      currentDrag: null,
      currentOver: null,
    }
  }

  canMovePieceTo(to) {
    return this.gametype.isMoveAllowed(this.state.currentDrag, to, this.state.positions)
  }

  movePiece(from, to) {
    const positions = [...this.state.positions]
    const fallen = [...this.state.fallen]
    this.gametype.movePiece(from, to, positions, fallen)
    this.setState({ positions, fallen })
  }

  handleStartDrag(squareID) {
    this.setState({ currentDrag: squareID })
  }

  handleOver(squareID) {
    this.setState({ currentOver: squareID })
  }

  handleEndDrag() {
    const from = this.state.currentDrag
    const to = this.state.currentOver

    if (this.canMovePieceTo(to)) this.movePiece(from, to)
    this.setState({ currentDrag: null, currentOver: null })
  }

  render() {
    console.log("Game was (re-)rendered")
    return (
      <div>
        <Board
          game={this}
          flip={this.props.flip}
          gametype={this.gametype}
          positions={this.state.positions}
          currentOver={this.state.currentOver}
          currentDrag={this.state.currentOver}
        />
      </div>
    )
  }
}
