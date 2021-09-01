import React from 'react'

import "./board.css"

function Square({ id, even, over, draged, game, children }) {
  return <td
    className={"square"}
    onDragStart={() => game.handleStartDrag(id)}
    onDragOverCapture={() => game.handleOver(id)}
    onDragEnd={() => game.handleEndDrag(id)}
    style={{ backgroundColor: over ? (game.canMovePieceTo(id) ? "blue" : "red") : (even ? "#FFCE9E" : "#D18B47") }}>
    <div style={{ opacity: draged ? 0 : 1 }}>{children}</div>
  </td>
}

function Row({ number, game, width, flip, height, positions }) {
  const y = number
  const displayNumber = flip ? y + 1 : height - y

  return <tr>
    <th>{displayNumber}</th>
    {Array(width).fill().map(
      (_, x) => {
        const squareID = y * height + x

        return <Square
          even={(y + x) % 2 === 0}
          game={game}
          id={squareID}
          draged={game.state.currentDrag === squareID}
          over={game.state.currentOver === squareID}>
          {positions[squareID]}
        </Square>
      }
    )}
    <th>{displayNumber}</th>
  </tr>
}

export default class Board extends React.Component {
  render() {
    const { game, gametype, currentOver, currentDrag, positions, flip } = this.props

    const { width, height } = gametype

    const letters = Array(width + 2).fill().map((_, i) =>
      i % (width + 1) === 0 ? null : String.fromCharCode(96 + i))

    if (flip) { positions.reverse(); letters.reverse() }
    const letterRow = letters.map((letter, _) => <th>{letter}</th>)

    return <table className="no-border">
      <thead>
        <tr>{letterRow}</tr>
      </thead>
      <tbody>
        {Array(height).fill().map((_, i) =>
          <Row
            number={i}
            flip={flip}
            width={width}
            height={height}
            positions={positions}
            game={game}
          />)}
      </tbody>
      <tfoot>
        <tr>{letterRow}</tr>
      </tfoot>
    </table>
  }
}
