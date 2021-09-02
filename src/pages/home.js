import React from "react"
import { useHistory } from "react-router-dom"
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'

import { RandomCheckers } from "../games/test"
import { RussianCheckers, InternationalCheckers } from "../games/checkers"


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
      }
    }
  }

  handleChange(gamename, fieldName, value) {
    const game = this.state[gamename + "Game"]
    game[fieldName] = value === "" ? null : value
    if (gamename === "new") this.setState({ newGame: game })
    else this.setState({ joinGame: game })
  }

  validateNewGame() {
    // then submit
  }

  validateJoinGame() {
    // then submit
  }

  renderTextField(gamename, field, label) {
    return <TextField
      id={gamename + "-game-" + field}
      label={label}
      style={{ margin: "10 0" }}
      onChange={(event) => this.handleChange(gamename, field, event.target.value)}
    />
  }

  render() {
    return <table><tbody><tr>
      <FormWrapper>
        {this.renderTextField("new", "username", "Your Username")}
        {this.renderTextField("new", "code", "Code (optional)")}
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
        <Button onClick={this.validateNewGame} variant="contained" color="primary" >New Game</Button>
      </FormWrapper>
      <FormWrapper>
        {this.renderTextField("join", "gameID", "Lobby ID")}
        {this.renderTextField("join", "username", "Your Username")}
        {this.renderTextField("join", "code", "Code (optional)")}
        <Button onClick={this.validateJoinGame} variant="contained" color="primary" >Join Game</Button>
      </FormWrapper>
    </tr></tbody></table>
  }
}
