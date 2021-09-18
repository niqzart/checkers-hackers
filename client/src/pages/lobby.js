import React from "react"
import { Grid, CircularProgress, IconButton } from "@material-ui/core"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import Game from "./game"


export default class LobbyPage extends React.Component {
  constructor({ location }) {
    super()

    const host = "s://checkers-hackers-server.herokuapp.com"
    // const host = "://localhost:4000"

    this.ws = new WebSocket(`ws${host}/lobbies/${location.state.gameID}/ws/?username=${location.state.username}&code=${location.state.code}`)
    this.ws.onclose = () => console.log("close")
    this.ws.onmessage = (message) => {
      const json = JSON.parse(message.data)
      if (json.type === "start") this.setState({ gameStarted: true })
    }

    this.side = location.state.side

    this.state = {
      codeShown: false,
      gameStarted: false,
    }
  }

  render() {
    const lobbySettings = this.props.location.state
    const hasCode = lobbySettings.code !== null && lobbySettings.code !== ""

    if (this.state.gameStarted) {
      return <Game ws={this.ws} flip={this.side === "black"} gametype={lobbySettings.gametype} />
    }
    else {
      return <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h1>Waiting for your opponent...</h1>
          <h2>To invite someone, send them lobby id: {this.props.location.state.gameID}</h2>
          {hasCode ? <h2>Lobby code: {this.state.codeShown ? lobbySettings.code : "•••••"}
            <IconButton size="small" onClick={() => this.setState({ codeShown: !this.state.codeShown })}>
              {this.state.codeShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </h2> : null}
        </Grid>
        <Grid item xs={12}>
          <CircularProgress thickness={3} size={70} />
        </Grid>
      </Grid>
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }
}
