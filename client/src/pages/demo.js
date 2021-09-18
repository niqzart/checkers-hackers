import { useLocation } from "react-router";

import Game from "./game";

export default function DemoPage() {
  const host = "s://checkers-hackers-server.herokuapp.com"
  // const host = "://localhost:4000"

  const query = new URLSearchParams(useLocation().search)
  const flip = query.get("flip")
  const gametype = query.get("gametype")

  const ws = {
    send: (message) => console.log("Trying to send:\n" + message)
  }

  return <Game
    ws={ws}
    flip={flip === null ? false : flip}  // use query string instead
    gametype={gametype === null ? 1 : gametype}  // use query string instead
  />
}
