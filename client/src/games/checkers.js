import { SixtyFourSquareCheckers, HundredSquareCheckers } from "./base"


export class RussianCheckers extends SixtyFourSquareCheckers {
  positioning(_, squareID) {
    if (((Math.floor(squareID / 8) + squareID) % 2 === 1) && (squareID < 24 || squareID > 39))
      return {
        color: squareID > 32 ? "white" : "black",
        king: false
      }
    else return null
  }

  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to, positions) && (Math.floor(to / 8) + to) % 2 === 1
  }
}

export class InternationalCheckers extends HundredSquareCheckers {
  positioning(_, squareID) {
    if (((Math.floor(squareID / 10) + squareID) % 2 === 1) && (squareID < 40 || squareID > 59))
      return {
        color: squareID > 50 ? "white" : "black",
        king: false
      }
    else return null
  }

  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to, positions) && (Math.floor(to / 10) + to) % 2 === 1
  }
}
