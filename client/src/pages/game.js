import React from "react"
import { Redirect } from "react-router"
import { Badge, Button, Drawer, Grid } from "@material-ui/core"

import Board from "../components/board"
import Grave from "../components/grave"


function representMove({ action, from, to, target }) {

}


export default class Game extends React.Component {
  constructor({ ws, flip, gametype }) {
    super()

    this.ws = ws
    this.ws.onmessage = (message) => {
      const json = JSON.parse(message.data)
      if (json.type === "sync") this.reproduceMove(json)
    }

    this.flip = flip
    this.gametype = gametype
    if (this.gametype === undefined) return

    const positions = Array(this.gametype.width * this.gametype.height).fill().map(this.gametype.positioning)
    if (this.flip) positions.reverse()

    this.state = {
      positions: positions,
      fallen: Array(this.gametype.pieces.length).fill(0),
      currentDrag: null,
      currentOver: null,
      moveLog: [],
      logOpen: false,
      unreadMoves: 0,
    }
  }

  logMove(move) {
    const moveLog = [...this.state.moveLog]
    moveLog.push(move)
    this.setState({ moveLog })
  }

  sendMove(move) {
    this.ws.send(JSON.stringify(move))
    this.logMove(move)
  }

  crown(squareID, animate = false) {
    const positions = [...this.state.positions]
    positions[squareID].king = !positions[squareID].king
    this.setState({ positions })
  }

  kill(squareID, animate = false) {
    const positions = [...this.state.positions]
    const fallen = [...this.state.fallen]

    // redo index getting with an abstraction!
    fallen[this.gametype.pieces.findIndex(x =>
      x.white === positions[squareID].white && x.king === positions[squareID].king)] += 1
    positions[squareID] = null

    this.setState({ positions, fallen })
  }

  movePiece(from, to, animate = false) {
    const positions = [...this.state.positions]
    const fallen = [...this.state.fallen]

    this.gametype.movePiece(from, to, positions, fallen)
    this.setState({ positions, fallen })
  }

  canMovePieceTo(to) {
    return this.gametype.isMoveAllowed(this.state.currentDrag, to, this.state.positions)
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

    if (to < 0 && from >= 0) {
      this.sendMove({
        type: "sync",
        action: "kill",
        target: from
      })
    } else if (this.canMovePieceTo(to)) {
      this.movePiece(from, to)
      this.sendMove({
        type: "sync",
        action: "move",
        from, to
      })
    }
    this.setState({ currentDrag: null, currentOver: null })
  }

  handleDoubleClick(squareID) {
    this.crown(squareID)
    this.sendMove({
      type: "sync",
      action: "crown",
      target: squareID,
    })
  }

  convertCoordinate(coord) { // make an absolute coord system instead
    return coord < 0 ? coord : this.gametype.width * this.gametype.height - coord - 1
  }

  reproduceMove(json) {
    if (json.action === "move") this.movePiece(
      this.convertCoordinate(json.from),
      this.convertCoordinate(json.to),
      true
    )
    else if (json.action === "kill") this.kill(this.convertCoordinate(json.target), true)
    else if (json.action === "crown") this.crown(this.convertCoordinate(json.target), true)
    else console.warn(`Unknown action type ${json.action}`)
    this.logMove(json)
  }

  render() {
    if (this.gametype === undefined) {
      console.log("Auto redirect from Game")
      return <Redirect to="/" push />
    }

    return (
      <div>
        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
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
          <Grid item xs={12} style={{ width: "500px" }}>
            <Grid container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <Grave
                  game={this}
                  gametype={this.gametype}
                  fallen={this.state.fallen}
                />
              </Grid>
              <Grid item xs={4} align="center">
                <Badge badgeContent={this.state.unreadMoves} color={"secondary"}>
                  <Button
                    onClick={() => this.setState({ logOpen: true, unreadMoves: 0 })}
                    variant="contained"
                    color={"primary"}
                  >
                    Open Logs
                  </Button>
                </Badge>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Drawer anchor={"bottom"} open={this.state.logOpen} onClose={() => this.setState({ logOpen: false })} >
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ width: "100%" }}
            onDoubleClick={() => {
              this.setState({ logOpen: false })
              this.revertLastMove()
              this.sendMove({ action: "revert" }, true)
            }}
          >
            {this.state.moveLog.map((move, i) => (
              <Grid item xs={12}>
                {move.action}
              </Grid>))}
          </Grid>
        </Drawer>
      </div>
    )
  }

  componentWillUnmount() {
    this.ws.close()
  }
}
