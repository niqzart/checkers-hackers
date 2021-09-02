import React from "react"
import { useHistory } from "react-router-dom"
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'

import { RandomCheckers } from "../games/test"
import { RussianCheckers, InternationalCheckers } from "../games/checkers"

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
      }
    }
  }

  handleChange(gamename, name, value) {
    const game = this.state[gamename + "Game"]
    game[name] = value === "" ? null : value
    if (gamename === "new") this.setState({ newGame: game })
    else this.setState({ joinGame: game })
  }

  validateNewGame() {
    // then submit
  }

  validateJoinGame() {
    // then submit
  }

  render() {
    return <table><tbody><tr>
      <td>
        <FormControl>
          <TextField
            id="new-game-username"
            label="Your Username"
            onChange={(event) => this.handleChange("new", "username", event.target.value)}
          />
          <TextField
            id="new-game-code"
            label="Code (optional)"
            onChange={(event) => this.handleChange("new", "code", event.target.value)}
          />
          <FormControl>
            <InputLabel id="new-game-type-lable">Game Type</InputLabel>
            <Select
              id="new-game-type"
              value={this.state.newGame.gametype}
              onChange={(event) => this.handleChange("new", "gametype", event.target.value)}
            >
              <MenuItem value={0}>Random</MenuItem>
              <MenuItem value={1}>Russian</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="new-game-side-lable">Your Side</InputLabel>
            <Select
              id="new-game-side"
              value={this.state.newGame.white}
              onChange={(event) => this.handleChange("new", "white", event.target.value)}
            >
              <MenuItem value={true}>White</MenuItem>
              <MenuItem value={false}>Black</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={this.validateNewGame} variant="outlined" >New Game</Button>
        </FormControl>
      </td>
      <td>
        <FormControl>
          <TextField
            id="join-game-id"
            label="Lobby ID"
            onChange={(event) => this.handleChange("join", "gameID", event.target.value)}
          />
          <TextField
            id="join-game-username"
            label="Your Username"
            onChange={(event) => this.handleChange("join", "username", event.target.value)}
          />
          <TextField
            id="join-game-code"
            label="Code (optional)"
            onChange={(event) => this.handleChange("join", "code", event.target.value)}
          />
          <Button onClick={this.validateJoinGame} variant="outlined" >Join Game</Button>
        </FormControl>
      </td>
    </tr></tbody></table>
  }
}
