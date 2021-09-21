import blackChecker from "../assets/black-checker.svg"
import whiteChecker from "../assets/white-checker.svg"
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"

export default function Checker({ king, color }) {
  return <img
    src={king ? (color === "white" ? whiteKing : blackKing) : (color === "white" ? whiteChecker : blackChecker)}
    alt={`A ${color === "white" ? "White" : "Black"} ${king ? "King" : "Checker"}`}
    // draggable={this.state.draggable}
    className={"piece"}
  />
}
