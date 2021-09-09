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
  websocketRooms[nextID] = {}

  const users = {}
  users[body.username] = body.side

  lobbies[++nextID] = {
    gametype: body.gametype,
    code: body.code,
    stated: false,
    users: users,
  }
})

app.post("/lobbies/:id/join/", ({ params, body }, response) => {
  const lobbyID = params.id
  if (!(lobbyID in Object.keys(lobbies))) {
    response.status = 404
    response.json = { message: "Lobby doesn't exist" }
  } else if (lobbies[params.id].code != body.code) {
    response.json = { message: "Wrong code" }
  } else {
    joinLobby(lobbyID, request.body.username)
    response.json = lobbies[lobbyID]
  }
})

app.get("/lobbies/:id/ws/", (request, response) => {
  const lobbyID = request.params.id
  const { username, code } = request.body
  if (request.headers.upgrade
    && request.headers.upgrade.toLowerCase() == "websocket"
    && request.headers.connection.match(/\bupgrade\b/i)) {
    if (canJoinLobby(lobbyID, username, code)) {
      sendToLobby(lobbyID, {
        type: "join",
        username: username,
        side: lobbies[lobbyID].users[username]
      })
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), (ws) => connect(ws, request.params.id))
    } else {
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), reject)
    }
  }
  else {
    response.status = 400
    response.json = { message: "Invalid headers" }
  }
})


function joinLobby(lobbyID, username) {
  lobbies[lobbyID].users[username] =
    "white" in Object.values(lobbies[lobbyID].users) ? "black" : "white"
}

function canJoinLobby(lobbyID, username, code) {
  return lobbyID in Object.keys(websocketRooms)
    && code == lobbies[lobbyID].code
    && username in Object.keys(lobbies[lobbyID].users)
    && websocketRooms[lobbyID].length < 2
}


function reject(webSocket) {
  webSocket.disconnect()
}

function sendJSON(client, data) {
  client.send(JSON.stringify(data))
}

function sendToLobby(lobbyID, data) {
  for (let client of websocketRooms[lobbyID]) sendJSON(client, data)
}

function connect(webSocket, lobbyID) {
  websocketRooms[lobbyID].push(webSocket)

  if (!lobbies[lobbyID].started && websocketRooms[lobbyID].length >= 2) {  // replace with max players
    lobbies[lobbyID].started = true
    sendToLobby(lobbyID, { type: "start" })
  } else if (lobbies[lobbyID].started) {
    sendJSON(webSocket, { type: "start" })
  }

  webSocket.on("message", (data) => sendToLobby(lobbyID, { type: "sync", data: data }))

  webSocket.on("close", () => websocketRooms[lobbyID].delete(webSocket))
}


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
