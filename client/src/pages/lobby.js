import React from "react"
import { Grid, CircularProgress, IconButton } from "@material-ui/core"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import Game from "./game"
import GameOver from "./gameover"
import { convertGametype } from "../games/index"


export default class LobbyPage extends React.Component {
  constructor({ location }) {
    super()

    // const host = "s://checkers-hackers-server.herokuapp.com"
    const host = "://localhost:4000"

    this.ws = new WebSocket(`ws${host}/lobbies/${location.state.gameID}/ws/?username=${location.state.username}&code=${location.state.code}`)
    this.ws.onclose = () => console.log("close")
    this.ws.onmessage = (message) => {
      const json = JSON.parse(message.data)
      if (json.type === "start") this.setState({ gameStarted: true })
      if (json.type === "join") {
        const users = { ...this.state.users }
        users[json.username] = json.side
        this.setState({ users })
      }
    }

    this.side = location.state.side
    this.gametype = convertGametype(location.state.gametype)

    this.state = {
      users: { ...location.state.users },
      codeShown: false,
      gameStarted: false,
      gameResult: null,
    }
  }

  render() {
    const lobbySettings = this.props.location.state
    const hasCode = lobbySettings.code !== null && lobbySettings.code !== ""

    if (this.state.gameResult !== null) {
      return <GameOver
        users={this.state.users}
        username={lobbySettings.username}
        result={this.state.gameResult}
        gametype={this.gametype}
      />
    } else if (this.state.gameStarted) {
      return <Game
        ws={this.ws}
        side={this.side}
        users={this.state.users}
        username={lobbySettings.username}
        setResult={(gameResult) => this.setState({ gameResult })}
        gametype={this.gametype}
      />
    } else {
      return <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} style={{ textAlign: "center", marginBottom: "0px" }}>
          <h1>Waiting for your opponent...</h1>
          <h2>To invite someone, send them lobby id: {this.props.location.state.gameID}</h2>
          {hasCode ? <h2>Lobby code: {this.state.codeShown ? lobbySettings.code : "•••••"}
            <IconButton
              size="small"
              onClick={() => this.setState({ codeShown: !this.state.codeShown })}
            >
              {this.state.codeShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </h2> : null}
          <h2 style={{ fontSize: "22px", margin: "0" }}>Users:</h2>
          {Object.entries(this.state.users).map(([username, side]) =>
            <h4 style={{ marginLeft: "20px", fontSize: "20px", margin: "0" }}>
              <b style={{ color: this.gametype.sideToColor(side) }}>⬤ </b>
              {username}
            </h4>
          )}
        </Grid>
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <CircularProgress thickness={3} size={70} />
        </Grid>
      </Grid>
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }
}
