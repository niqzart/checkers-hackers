import React from "react"

import LobbyPage from "./lobby"


export default class DemoPage extends React.Component {
  constructor({ location }) {
    super()

    this.state = {
      redirect: null,
    }

    // this.host = "s://checkers-hackers-server.herokuapp.com"
    this.host = "://localhost:4000"

    const query = new URLSearchParams(location.search)
    var flip = query.get("flip")
    var gametype = query.get("gametype")

    if (gametype === null) gametype = 1

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
      gameID: `-${gametype}`,
      username: "qzart",
      code: "",
    }

    fetch(`http${this.host}/lobbies/${gameData.gameID}/join/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData),
    }).then((response) => {
      if (response.status === 404) console.log("Lobby not found")
      else {
        response.json().then((json) => {
          console.log(json)
          if (json.message === "Success") {
            this.setState({
              redirect: { side: json.users[gameData.username], ...gameData, ...json }
            })
          } else console.log("Unable to connect")
        })
      }
    })
  }

  render() {
    if (this.state.redirect === null) return <div>Connecting...</div>
    else return <LobbyPage location={{ state: this.state.redirect }} />
  }
}
