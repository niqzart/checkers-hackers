import { Grid } from "@material-ui/core"

function getUsername(users, winnerSide) {
  var [username, side] = [null, null]
  for ([username, side] of Object.entries(users)) if (side === winnerSide) break
  return username
}

export default function GameOver({ username, users, gametype, result }) {
  const winnerSide = result.winner
  const winnerUsername = getUsername(users, winnerSide)

  return <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Grid item xs={12} style={{ textAlign: "center" }}>
      <h1>Game over!</h1>
      <h2 style={{ color: gametype.sideToColor(winnerSide) }}>
        {winnerSide === users[username] ? "You" : winnerUsername} won!
      </h2>
    </Grid>
    <Grid item xs={12} style={{ textAlign: "center" }}>
      {Object.entries(users).map(([username, side]) =>
        <b>
          <b style={{ color: gametype.sideToColor(side) }} >⬤ </b>
          <b>{username}</b>
        </b>
      )}
    </Grid>
  </Grid>
}