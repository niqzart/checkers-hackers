import Checker from "../pieces/checkers"
import { SixtyFourSquareCheckers } from "./base"


export class RandomCheckers extends SixtyFourSquareCheckers {
  positioning() {
    return Math.random() < 0.5 ? null : <Checker white={Math.random() < 0.5} king={Math.random() < 0.5} />
  }
}
