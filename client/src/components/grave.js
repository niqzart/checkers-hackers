import Checker from "./pieces"
import { Grid } from "@material-ui/core"
import React from "react"


export default class Grave extends React.Component {
  constructor() {
    super()
    this.state = {
      dragOver: false
    }
  }

  render() {
    const { gametype, game, fallen } = this.props
    return <Grid container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      onDragEnter={() => game.handleOver(-1)}
      style={{
        margin: "auto",
        marginTop: "6px",
        width: "100%",
        background: this.state.dragOver ? "blue" : null,
      }}
    >
      {gametype.pieces.map((piece, index) =>
        <Grid item
          style={{ opacity: fallen[index] === 0 ? 0.4 : 1 }}
          onDragStart={() => game.handleStartDrag(-index - 1)}
          onDragEnd={() => game.handleEndDrag()}
        >
          <Checker colors={piece.colors} king={piece.king} number={fallen[index]} />
        </Grid>
      )}
    </Grid>
  }
}
