import React from 'react';

import "./board.css";
import blackChecker from "../assets/black-checker.svg"
import whiteChecker from "../assets/white-checker.svg"
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"

function Checker(props) {
  // props: white (bool), king (bool)
  return <img src={props.king ? (props.white ? whiteKing : blackKing) : (props.white ? whiteChecker : blackChecker)}
    alt={`A ${props.white ? "White" : "Black"} ${props.king ? "King" : "Checker"}`} className={"piece"} />
}

function Square(props) {
  return <td className={"square " + (props.even ? "light" : "dark")}>{props.children}</td>
}

function Row(props) {
  const i = props.number

  return <tr><th>{props.flip ? i + 1 : props.width - i}</th>
    {Array(props.width).fill().map((x, j) => {
      const even = (i + j) % 2 === 0
      const value = props.positions[Math.floor((i * props.width + j) / 2)]

      return <Square even={even} >{
        even || value === 0 ? null : <Checker white={value > 0} king={Math.abs(value) > 1} />
      }</Square>
    })}<th>{props.flip ? i + 1 : props.width - i}</th></tr>
}

export default function Board(props) {
  const width = props.gameType.width
  const height = props.gameType.height

  const letters = Array(width + 2).fill().map((x, i) =>
    i % (width + 1) === 0 ? null : String.fromCharCode(96 + i))
  const positions = Array(height * width / 2).fill().map(props.gameType.positions)

  if (props.flip) { positions.reverse(); letters.reverse() }
  const letterRow = letters.map((letter, i) => <th>{letter}</th>)

  return <table className="no-border">
    <thead>
      <tr>{letterRow}</tr>
    </thead>
    <tbody>
      {Array(height).fill().map((x, i) =>
        <Row number={i} flip={props.flip} width={width} positions={positions} />)}
    </tbody>
    <tfoot>
      <tr>{letterRow}</tr>
    </tfoot>
  </table>
}
