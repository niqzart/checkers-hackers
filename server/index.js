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
import cors from "cors"
import { WebSocketServer } from "ws"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const wss = new WebSocketServer({ server: app })


var nextID = 0
const lobbies = {}
const websocketRooms = {}


function joinLobby(lobbyID, username) {
  const lobby = lobbies[lobbyID]
  lobby.users[username] = lobby.nextSide
  lobby.nextSide = (lobby.nextSide + Math.floor(4 / lobby.maxPlayers)) % 4
}


app.post("/lobbies/", ({ body }, response) => {
  websocketRooms[nextID] = []
  lobbies[nextID] = {
    maxPlayers: body.gametype < 10 ? 2 : 4,
    nextSide: body.side,
    gametype: body.gametype,
    code: body.code,
    stated: false,
    users: {},
  }
  
  joinLobby(nextID, body.username)
  response.json({ "id": nextID++ })

  console.log(lobbies)
})

app.post("/lobbies/:id/join/", ({ params, body }, response) => {
  const lobbyID = params.id

  if (!(lobbyID in lobbies)) {
    response.status(404).json({ message: "Lobby doesn't exist" })
  } else if (lobbies[params.id].code != body.code) {
    response.json({ message: "Wrong code" })
  } else {
    joinLobby(lobbyID, body.username)
    response.json({ message: "Success", ...lobbies[lobbyID] })
  }
})

app.get("/lobbies/:id/ws/", (request, response) => {
  const lobbyID = request.params.id
  const { username, code } = request.query
  if (request.headers.upgrade
    && request.headers.upgrade.toLowerCase() == "websocket"
    && request.headers.connection.match(/\bupgrade\b/i)) {
    if (canJoinLobby(lobbyID, username, code)) {
      sendJSONToLobby(lobbyID, {
        type: "join",
        username: username,
        side: lobbies[lobbyID].users[username]
      })
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), (ws) => connect(ws, request.params.id))
    } else {
      wss.handleUpgrade(request, request.socket, Buffer.alloc(0), reject)
    }
  }
  else response.status(400).json({ message: "Invalid headers" })
})

function canJoinLobby(lobbyID, username, code) {
  return lobbyID in websocketRooms
    && code == (lobbies[lobbyID].code)
    && username in lobbies[lobbyID].users
    && websocketRooms[lobbyID].length < 2
}


function reject(webSocket) {
  webSocket.close()
}

function sendJSON(client, data) {
  client.send(JSON.stringify(data))
}

function sendJSONToLobby(lobbyID, data, actor) {
  for (let client of websocketRooms[lobbyID]) {
    if (client != actor) sendJSON(client, data)
  }
}

function connect(webSocket, lobbyID) {
  websocketRooms[lobbyID].push(webSocket)

  if (!lobbies[lobbyID].started && websocketRooms[lobbyID].length >= 2) {  // replace with max players
    lobbies[lobbyID].started = true
    sendJSONToLobby(lobbyID, { type: "start" })
  } else if (lobbies[lobbyID].started) {
    sendJSON(webSocket, { type: "start" })
  }

  webSocket.on("message", (message) => {
    for (let client of websocketRooms[lobbyID]) {
      if (client != webSocket) client.send(message.toString())
    }
  })
  
  let interval = setInterval(() => { 
    webSocket.ping()
    // console.log("ping") 
  }, 50e3)

  webSocket.on("close", () => {
    clearInterval(interval)
    const index = websocketRooms[lobbyID].indexOf(webSocket)
    websocketRooms[lobbyID].splice(index, 1)
    if (websocketRooms[lobbyID].length === 0) {
      delete lobbies[lobbyID]
      delete websocketRooms[lobbyID]
    }
  })
}


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
