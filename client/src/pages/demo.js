import { useLocation } from "react-router";

import Game from "./game";

export default function DemoPage() {
  const query = new URLSearchParams(useLocation().search)
  const flip = query.get("flip")
  const gametype = query.get("gametype")

  const ws = {
    send: (message) => console.log("Trying to send:\n" + message),
    close: () => console.log("Trying to send:\nCLOSED"),
  }

  return <Game
    ws={ws}
    flip={flip === "true" ? true : false}  // use query string instead
    gametype={gametype === null ? 1 : parseInt(gametype)}  // use query string instead
  />
}
