import React from "react"
import { Grid } from "@material-ui/core"

import Board from "../components/board"
import Grave from "../components/grave"
import { Redirect } from "react-router"


export default class GamePage extends React.Component {
  constructor({ location }) {
    super()

    // decide props.location.status to gametype, flip & starting positions
    this.flip = location.state.flip
    this.gametype = location.state.gametype
    if (this.gametype === undefined) return

    const positions = Array(this.gametype.width * this.gametype.height).fill().map(this.gametype.positioning)
    if (this.flip) positions.reverse();

    this.state = {
      positions: positions,
      fallen: [],
      currentDrag: null,
      currentOver: null,
    }
  }

  kill(squareID) {
    const positions = [...this.state.positions]
    const fallen = [...this.state.fallen]

    fallen.push(positions[squareID])
    positions[squareID] = null

    // send data to the server

    this.setState({ positions, fallen })
  }

  canMovePieceTo(to) {
    return this.gametype.isMoveAllowed(this.state.currentDrag, to, this.state.positions)
  }

  movePiece(from, to) {
    const positions = [...this.state.positions]
    const fallen = [...this.state.fallen]

    // send data to the server

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

    if (to < 0) this.kill(from)
    else if (this.canMovePieceTo(to)) this.movePiece(from, to)
    this.setState({ currentDrag: null, currentOver: null })
  }

  handleDoubleClick(squareID) {
    const positions = [...this.state.positions]
    positions[squareID].king = !positions[squareID].king
    this.setState({ positions })
  }

  render() {
    if (this.gametype === undefined) return <Redirect to="/" push />

    return (
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Grid item xs={12}>
          <Board
            game={this}
            flip={this.flip}
            gametype={this.gametype}
            positions={this.state.positions}
            currentOver={this.state.currentOver}
            currentDrag={this.state.currentOver}
          />
        </Grid>
        <Grid item xs={12}>
          <Grave
            game={this}
            gametype={this.gametype}
            fallen={this.state.fallen}
          />
        </Grid>
      </Grid>
    )
  }
}
