import React from "react"

import LobbyPage from "./lobby"


export default class DemoPage extends React.Component {
  constructor({ location }) {
    super()

    this.state = { redirect: [] }

    // this.host = "s://checkers-hackers-server.herokuapp.com"
    this.host = "://localhost:4000"

    const query = new URLSearchParams(location.search)
    this.side = query.get("side")
    this.gametype = query.get("gametype")

    if (this.gametype === null) this.gametype = "1"
    if (this.side === null) this.side = 0
    else this.side = parseInt(this.side)

    // const ws = {
    //   send: (message) => console.log("Trying to send:\n" + message),
    //   close: () => console.log("Trying to send:\nCLOSED"),
    // }

    // <Game
    //   ws={ws}
    //   flip={flip === "true" ? true : false}
    //   gametype={convertGametype(gametype === null ? 1 : parseInt(gametype))}
    // />

    const gameData = {
      gameID: `-${this.gametype}`,
      username: "qzart",
      code: "",
    }

    Array(this.gametype < 10 ? 2 : 4).fill().map(() => {
      fetch(`http${this.host}/lobbies/${gameData.gameID}/join/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData),
      }).then((response) => {
        if (response.status === 404) console.warn("Lobby not found")
        else {
          response.json().then((json) => {
            const side = json.users[gameData.username]
            if (json.message === "Success") {
              const redirect = [...this.state.redirect]
              redirect[side] = { side, ...gameData, ...json }
              this.setState({ redirect })
            } else console.warn("Unable to connect")
          })
        }
      })
    })
  }

  render() {
    const maxPlayers = this.gametype < 10 ? 2 : 4
    if (Object.keys(this.state.redirect).length < maxPlayers) return <div>Connecting...</div>
    else return <div>
      {Array(maxPlayers).fill().map((_, i) => <div style={{ display: (i * (4 / maxPlayers)) === this.side ? "block" : "none" }}>
        <LobbyPage location={{ state: this.state.redirect[i * (4 / maxPlayers)] }} />
      </div>)}
    </div>
  }
}
