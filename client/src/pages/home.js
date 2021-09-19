import React from "react"
import { Redirect } from "react-router"
import { Box, Button, TextField, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"


function FormWrapper({ children }) {
  return <td><FormControl style={{ padding: "70px 30px" }}>{children}</FormControl></td>
}


export default class HomePage extends React.Component {
  constructor() {
    super()

    this.host = "s://checkers-hackers-server.herokuapp.com"
    // this.host = "://localhost:4000"

    this.state = {
      newGame: {
        username: null,
        gametype: 2,
        side: 0,
        code: null,
      },
      joinGame: {
        gameID: null,
        username: null,
        code: null,
      },
      redirect: null,
      errors: {
        newGameUsername: null,
        joinGameUsername: null,
        joinGameGameID: null,
        joinGameCode: null,
      },
    }
  }

  handleChange(gamename, fieldName, value) {
    const game = this.state[gamename + "Game"]
    game[fieldName] = value === null ? "" : value

    const errors = { ...this.state.errors }

    if (gamename === "new") {
      if (fieldName === "username") errors.newGameUsername = null
      this.setState({ newGame: game, errors: errors })
    }
    else {
      if (fieldName === "username") errors.joinGameUsername = null
      if (fieldName === "gameID") errors.joinGameGameID = null
      this.setState({ joinGame: game, errors: errors })
    }
  }

  validateNewGame() {
    const gameData = this.state.newGame
    if (gameData.username === null) this.setState({ errors: { ...this.state.errors, newGameUsername: true } })
    else {
      if (gameData.code === null) gameData.code = ""
      fetch(`http${this.host}/lobbies/`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(gameData),
      }).then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({
          redirect: {
            pathname: "/lobby/",
            state: {
              gameID: json["id"],
              ...gameData
            }
          }
        })
      })
    }
  }

  validateJoinGame() {
    const gameData = this.state.joinGame
    const errors = { ...this.state.errors }
    if (gameData.username === null || gameData.gameID === null) {
      if (gameData.username === null) errors.joinGameUsername = true
      if (gameData.gameID === null) errors.joinGameGameID = true
      this.setState({ errors })
    } else {
      if (gameData.code === null) gameData.code = ""
      fetch(`http${this.host}/lobbies/${gameData.gameID}/join/`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(gameData),
      }).then((response) => {
        if (response.status === 404) {
          errors.joinGameGameID = "Game not found"
          this.setState({ errors })
        } else {
          response.json().then((json) => {
            console.log(json)
            if (json.message === "Success") {
              this.setState({
                redirect: {
                  pathname: "/lobby/",
                  state: { side: json.users[gameData.username], ...gameData, ...json }
                }
              })
            } else {
              errors.joinGameCode = "Wrong code"
              this.setState({ errors })
            }
          })
        }
      })
    }
  }

  renderTextField(gamename, field, label) {
    var error = this.state.errors[gamename + "Game" + field.charAt(0).toUpperCase() + field.slice(1)]
    if (error === true) error = "This shouldn't be empty"
    return <Box marginTop="4px" marginBottom="4px"><TextField
      id={gamename + "-game-" + field}
      label={label}
      error={error !== null && error !== undefined}
      helperText={error}
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
      return <Redirect to={this.state.redirect} push />
    }

    return <table style={{ margin: "auto" }}><tbody><tr>
      <FormWrapper>
        {this.renderTextField("new", "username", "Your Username")}
        {this.renderTextField("new", "code", "Code (optional)")}
        <Box marginTop="4px" marginBottom="4px">
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="new-game-type-label">Game Type</InputLabel>
            <Select
              id="new-game-type"
              variant="outlined"
              value={this.state.newGame.gametype}
              onChange={(event) => this.handleChange("new", "gametype", event.target.value)}
            >
              {/* <MenuItem value={0}>Random</MenuItem> */}
              <MenuItem value={1}>Russian</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box marginTop="4px" marginBottom="4px">
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="new-game-side-label">Your Side</InputLabel>
            <Select
              id="new-game-side"
              variant="outlined"
              value={this.state.newGame.side}
              onChange={(event) => this.handleChange("new", "side", event.target.value)}
            >
              <MenuItem value={0}>White</MenuItem>
              <MenuItem value={2}>Black</MenuItem>
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
