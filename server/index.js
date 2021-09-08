// Lobbies HTTP:
// POST /lobbies/ -> create a lobby, init a websocket room, return ID & room-code           DONE
// POST /lobbies/id/join/ -> check if exists, check code & return room-code                 DONE
// **** /lobbies/id/ws/ -> check the code & connect to websocket room                       DONE

// WebSocket:
// server: onConnect() -> add user to the lobby & check if game can be / has been started   DONE
// client: onMessage("start") -> game has been started                                      
// server: onMessage("turn") -> send to all other clients                                   DONE

// For client:
// Keep the websocket from LobbyPage to GamePage (location.state)

// RPC vs REST

import express from "express"
import Server from "ws"

const wss = new Server({ noServer: true })
const app = express()

var nextID = 0
const lobbies = {}
const websocketRooms = {}


app.post("/lobbies/", ({ body }, response) => {
  response.json = { "id": nextID }
  lobbies[nextID] = { ...body, stated: false }
  websocketRooms[++nextID] = []
})

app.post("/lobbies/:id/join/", ({ params, body }, response) => {
  const lobbyID = params.id
  if (!(lobbyID in Object.keys(lobbies))) {
    response.status = 404
    response.json = { message: "Lobby doesn't exist" }
  } else if (lobbies[params.id].code != body.code) {
    response.json = { message: "Wrong code" }
  } else {
    response.json = lobbies[lobbyID]
  }
})

app.get("/lobbies/:id/ws/", (request, response) => {
  if (request.headers.upgrade
    && request.headers.upgrade.toLowerCase() == "websocket"
    && request.headers.connection.match(/\bupgrade\b/i)) {
    if (canJoinLobby(request.params.id, request.body.code))
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), (ws) => connect(ws, request.params.id))
    else {
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), reject)
    }
  }
  else {
    response.status = 400
    response.json = { message: "Invalid headers" }
  }
})


function canJoinLobby(lobbyID, code) {
  return lobbyID in Object.keys(websocketRooms) && code == lobbies[lobbyID].code
}


function reject(webSocket) {
  webSocket.disconnect()
}

function connect(webSocket, lobbyID) {
  websocketRooms[lobbyID].push(webSocket)

  webSocket.on("turn", (message) => {
    for (let client of websocketRooms[lobbyID]) client.send(message)
  })

  webSocket.on("close", () => websocketRooms[lobbyID].delete(webSocket))
}


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
