import blackChecker from "../assets/black-checker.svg"
import whiteChecker from "../assets/white-checker.svg"
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"

export function Checker(props) {
  // props: white (bool), king (bool)
  return <img src={props.king ? (props.white ? whiteKing : blackKing) : (props.white ? whiteChecker : blackChecker)}
    alt={`A ${props.white ? "White" : "Black"} ${props.king ? "King" : "Checker"}`} className={"piece"} />
}
