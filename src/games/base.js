export class GameType {
  constructor(width, height, totalPieces) {
    this.width = width
    this.height = height
    this.totalPieces = totalPieces
  }

  positioning(_, squareID) {
    return null
  }

  isMoveAllowed(from, to) {
    return from !== to
  }

  movePiece(from, to, positions, fallen) {  // retruns if you should end the turn (later)
    if (from < 0) {
      positions[to] = fallen[-1 - from]
      fallen[-1 - from] = null
    } else {
      positions[to] = positions[from]
      positions[from] = null
    }
  }
}

export class CheckersBase extends GameType {
  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to) && positions[to] === null
  }
}

export class SixtyFourSquareCheckers extends CheckersBase {
  constructor() {
    super(8, 8, 12)
  }
}

export class HundredSquareCheckers extends CheckersBase {
  constructor() {
    super(10, 10, 20)
  }
}
