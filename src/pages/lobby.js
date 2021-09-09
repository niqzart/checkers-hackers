import React from "react"
import { Redirect } from "react-router"
import { Grid, CircularProgress, IconButton } from "@material-ui/core"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"


export default class LobbyPage extends React.Component {
  constructor() {
    super()

    this.ws = location.state.ws

    this.state = {
      codeShown: false,
      gameStarted: false,
    }
  }

  render() {
    const lobbySettings = this.props.location.state
    const hasCode = lobbySettings.code !== null

    if (this.state.gameStarted) return <Redirect to={{ pathname: "/games/", state: lobbySettings }} push />
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
