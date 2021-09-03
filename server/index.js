import { OpenGame, StartedGame } from "./lobbies.js"
import express from "express"

const app = express()


const openGames = {}
const startedGames = {}


app.post("/games/", ({ body }, response) => {
  const game = OpenGame(body)
  openGames[game.id] = game
  response.json({ id: game.id });
})

app.get("/games/", (_, response) => {
  response.json(Object.values(openGames))
})


app.post("/games/:id/join/", ({ params, body }, response) => {
  if (!params.id in openGames) {
    response.status = 404
    response.json = { message: "Game doesn't exist" }
  } else if (openGames[params.id].code !== body.code) {
    response.status = 403
    response.json = { message: "Wrong code" }
  } else {
    startedGames[params.id] = StartedGame(openGames[params.id].firstPlayer, body.player)
    delete openGames[params.id]
    response.json = { message: "Success" }
  }
})


app.get("/games/:id/turn/", ({ params, body }, response) => {
  response.json = { turn: startedGames[params.id].getLastTurn(body.player) }
})

app.post("/games/:id/turn/", ({ params, body }, response) => {
  startedGames[params.id].makeAMove(body)
  response.json = { message: "Success" }
})


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
