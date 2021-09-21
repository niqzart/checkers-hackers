import { SixtyFourSquareCheckers, HundredSquareCheckers } from "./base"


export class RussianCheckers extends SixtyFourSquareCheckers {
  positioning(squareID) {
    if (((Math.floor(squareID / 8) + squareID) % 2 === 1) && (squareID < 24 || squareID > 39))
      return {...this.pieces[squareID > 32 ? 0 : 2]}
    else return null
  }

  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to, positions) && (Math.floor(to / 8) + to) % 2 === 1
  }
}

export class InternationalCheckers extends HundredSquareCheckers {
  positioning(squareID) {
    if (((Math.floor(squareID / 10) + squareID) % 2 === 1) && (squareID < 40 || squareID > 59))
      return this.pieces[squareID > 50 ? 0 : 2]
    else return null
  }

  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to, positions) && (Math.floor(to / 10) + to) % 2 === 1
  }
}
