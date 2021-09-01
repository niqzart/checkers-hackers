import blackChecker from "../assets/black-checker.svg"
import whiteChecker from "../assets/white-checker.svg"
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"
import React from "react"

export default class Checker extends React.Component {
  constructor() {
    super()
  }

  render() {
    // props: white (bool), king (bool)
    const { white, king } = this.props
    return <img src={king ? (white ? whiteKing : blackKing) : (white ? whiteChecker : blackChecker)}
      alt={`A ${white ? "White" : "Black"} ${king ? "King" : "Checker"}`} className={"piece"} />
  }
}
