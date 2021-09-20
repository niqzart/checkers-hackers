import "./board.css"

import React from "react"

import Square from "./square"


function Row({ number, game, width, height, side, positions }) {
  var y = number

  var rowID = side < 2 ? y + 1 : height - y
  if (rowID % 2 === 1) String.fromCharCode(96 + rowID)

  return <tr key={y}>
    <th>{rowID}</th>
    {Array(width).fill().map(
      (_, x) => {
        if (side === 1) [x, y] = [y, height - x]
        if (side === 3) [x, y] = [width - y, x]

        var squareID = y * width + x
        if (side === 2) squareID = height * width - squareID - 1

        return <Square
          key={squareID}
          even={(y + x) % 2 === 0}
          game={game}
          id={squareID}
          dragged={game.state.currentDrag === squareID}
          over={game.state.currentOver === squareID}
          checker={positions[squareID]}
        />
      }
    )}
    <th>{rowID}</th>
  </tr>
}

export default class Board extends React.Component {
  constructor({ side, gametype }) {
    super()
    const letters = Array(gametype.width + 2).fill().map(
      (_, i) => i % (gametype.width + 1) === 0 ? null
        : (side % 2 === 0 ? String.fromCharCode(96 + i) : i))
    if (side === 2) { letters.reverse() }
    this.letterRow = letters.map((letter, i) => <th key={i}>{letter}</th>)
  }

  render() {
    const { game, gametype, side, positions } = this.props

    const { width, height } = gametype

    return <table className="no-border">
      <thead>
        <tr>{this.letterRow}</tr>
      </thead>
      <tbody>
        {Array(height).fill().map((_, i) =>
          <Row
            key={i}
            number={i}
            width={width}
            height={height}
            side={side}
            game={game}
            positions={positions}
          />)}
      </tbody>
      <tfoot>
        <tr>{this.letterRow}</tr>
      </tfoot>
    </table>
  }
}
