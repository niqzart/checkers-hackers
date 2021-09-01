export class GameType {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  positioning(_, squareID) {
    return null
  }

  isMoveAllowed(from, to) {
    return from !== to
  }

  movePiece(from, to, positions, fallen) {
    positions[to] = positions[from]
    positions[from] = null
  }
}

export class CheckersBase extends GameType {
  isMoveAllowed(from, to, positions) {
    return super.isMoveAllowed(from, to) && positions[to] === null
  }
}

export class SixtyFourSquareCheckers extends CheckersBase {
  constructor() {
    super(8, 8)
  }
}

export class HundredSquareCheckers extends CheckersBase {
  constructor() {
    super(10, 10)
  }
}
