import React from "react"

import "./board.css"
import Checker from "./pieces"

function Square({ id, even, over, draged, game, checker }) {
  return <td
    key={id}
    className={"square"}
    onDragStart={() => game.handleStartDrag(id)}
    onDragEnter={() => game.handleOver(id)}
    onDragEnd={() => game.handleEndDrag(id)}
    onDoubleClick={() => game.handleDoubleClick(id)}
    // style={{ backgroundColor: over ? (game.canMovePieceTo(id) ? "blue" : "red") : (even ? "#FFCE9E" : "#D18B47") }}>
    style={{ backgroundColor: over && game.canMovePieceTo(id) ? "blue" : (even ? "#FFCE9E" : "#D18B47") }}>
    <div style={{ opacity: draged ? 0 : 1 }}>
      {checker === null ? null : <Checker white={checker.white} king={checker.king} />}
    </div>
  </td>
}

function Row({ number, game, width, flip, height, positions }) {
  const y = number
  const displayNumber = flip ? y + 1 : height - y

  return <tr key={y}>
    <th>{displayNumber}</th>
    {Array(width).fill().map(
      (_, x) => {
        const squareID = y * height + x

        return <Square
          key={squareID}
          even={(y + x) % 2 === 0}
          game={game}
          id={squareID}
          draged={game.state.currentDrag === squareID}
          over={game.state.currentOver === squareID}
          checker={positions[squareID]}
        />
      }
    )}
    <th>{displayNumber}</th>
  </tr>
}

export default class Board extends React.Component {
  constructor({ flip, gametype }) {
    super()
    const letters = Array(gametype.width + 2).fill().map((_, i) =>
      i % (gametype.width + 1) === 0 ? null : String.fromCharCode(96 + i))
    if (flip) { letters.reverse() }
    this.letterRow = letters.map((letter, i) => <th key={i}>{letter}</th>)
  }

  render() {
    const { game, gametype, flip, positions } = this.props

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
            flip={flip}
            positions={positions}
            game={game}
          />)}
      </tbody>
      <tfoot>
        <tr>{this.letterRow}</tr>
      </tfoot>
    </table>
  }
}
