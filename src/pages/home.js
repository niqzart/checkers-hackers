import React from "react"
import { Box, Button, TextField, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"

import { Redirect } from "react-router"


function FormWrapper({ children }) {
  return <td><FormControl style={{ padding: 100 }}>{children}</FormControl></td>
}


export default class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      newGame: {
        username: null,
        gametype: 0,
        white: true,
        code: null,
      },
      joinGame: {
        gameID: null,
        username: null,
        code: null,
      },
      redirect: null,
      errors: {
        newGameUsername: false,
        joinGameUsername: false,
        joinGameGameID: false,
      },
    }
  }

  handleChange(gamename, fieldName, value) {
    const game = this.state[gamename + "Game"]
    game[fieldName] = value === "" ? null : value

    const errors = { ...this.state.errors }

    if (gamename === "new") {
      if (fieldName === "username") errors.newGameUsername = false
      this.setState({ newGame: game, errors: errors })
    }
    else {
      if (fieldName === "username") errors.joinGameUsername = false
      if (fieldName === "gameID") errors.joinGameGameID = false
      this.setState({ joinGame: game, errors: errors })
    }
  }

  validateNewGame() {
    // then submit
    if (this.state.newGame.username === null) this.setState({ errors: { ...this.state.errors, newGameUsername: true } })
    else this.setState({ redirect: { pathname: "/lobby/", state: {gameID: 23, ...this.state.newGame} } })
  }

  validateJoinGame() {
    // then submit
    const gameData = this.state.joinGame
    const errors = { ...this.state.errors }
    if (gameData.username === null || gameData.gameID === null) {
      if (gameData.username === null) errors.joinGameUsername = true
      if (gameData.gameID === null) errors.joinGameGameID = true
      this.setState({ errors })
    } else this.setState({ redirect: { pathname: "/game/", state: gameData } })
  }

  renderTextField(gamename, field, label) {
    const error = this.state.errors[gamename + "Game" + field.charAt(0).toUpperCase() + field.slice(1)]
    return <Box marginTop="4px" marginBottom="4px"><TextField
      id={gamename + "-game-" + field}
      label={label}
      error={error}
      helperText={error ? "This shouldn't be empty" : null}
      variant="outlined"
      onChange={(event) => this.handleChange(gamename, field, event.target.value)}
    /></Box>
  }

  renderButton(gamename) {
    return <Box m="auto" marginTop="6px"><Button
      onClick={() => this["validate" + gamename + "Game"]()}
      variant="contained"
      color="primary"
    >{gamename} Game</Button></Box>
  }

  render() {
    if (this.state.redirect !== null) {
      console.log(this.state.redirect)
      return <Redirect to={this.state.redirect} push />
    }

    return <table style={{ margin: "auto" }}><tbody><tr>
      <FormWrapper>
        {this.renderTextField("new", "username", "Your Username")}
        {this.renderTextField("new", "code", "Code (optional)")}
        <Box marginTop="4px" marginBottom="4px">
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="new-game-type-lable">Game Type</InputLabel>
            <Select
              id="new-game-type"
              variant="outlined"
              value={this.state.newGame.gametype}
              onChange={(event) => this.handleChange("new", "gametype", event.target.value)}
            >
              <MenuItem value={0}>Random</MenuItem>
              <MenuItem value={1}>Russian</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box marginTop="4px" marginBottom="4px">
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="new-game-side-lable">Your Side</InputLabel>
            <Select
              id="new-game-side"
              variant="outlined"
              value={this.state.newGame.white}
              onChange={(event) => this.handleChange("new", "white", event.target.value)}
            >
              <MenuItem value={true}>White</MenuItem>
              <MenuItem value={false}>Black</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {this.renderButton("New")}
      </FormWrapper>
      <FormWrapper>
        {this.renderTextField("join", "gameID", "Lobby ID")}
        {this.renderTextField("join", "username", "Your Username")}
        {this.renderTextField("join", "code", "Code (optional)")}
        {this.renderButton("Join")}
      </FormWrapper>
    </tr></tbody></table>
  }
}
