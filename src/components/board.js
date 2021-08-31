import React from 'react'

import "./board.css"

function Square({ even, onClick, children }) {
  return <td onDragStart={onClick} onDragOverCapture={onClick} onDragEnd={onClick}
    className={"square " + (even ? "light" : "dark")}>{children}</td>
}

function Row({ number, onClick, width, flip, height, positions }) {
  const y = number
  const displayNumber = flip ? y + 1 : height - y

  return <tr><th>{displayNumber}</th>
    {Array(width).fill().map((_, x) => {
      const even = (y + x) % 2 === 0
      const squareID = y * height + x

      return <Square even={even} onClick={() => onClick(squareID)} >{positions[squareID]}</Square>
    })}<th>{displayNumber}</th></tr>
}

export default function Board({ gameType, flip }) {
  const { width, height } = gameType

  const letters = Array(width + 2).fill().map((x, i) =>
    i % (width + 1) === 0 ? null : String.fromCharCode(96 + i))
  const positions = Array(height * width).fill().map(gameType.positions)

  if (flip) { positions.reverse(); letters.reverse() }
  const letterRow = letters.map((letter, i) => <th>{letter}</th>)

  return <table className="no-border">
    <thead>
      <tr>{letterRow}</tr>
    </thead>
    <tbody>
      {Array(height).fill().map((x, i) =>
        <Row number={i} flip={flip} width={width} height={height}
          positions={positions} onClick={(squareID) => console.log(squareID)} />)}
    </tbody>
    <tfoot>
      <tr>{letterRow}</tr>
    </tfoot>
  </table>
}
