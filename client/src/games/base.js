export class GameType {
  constructor(width, height, pieces) {
    this.width = width
    this.height = height
    this.pieces = [...pieces]
  }

  sideToColor(side) {
    return "none"
  }

  positioning(_, squareID) {
    return null
  }

  isMoveAllowed(from, to) {
    return from !== to
  }

  getWinner(fallen) {
    return null
  }

  movePiece(from, to, positions, fallen) {  // returns if you should end the turn (later)
    if (from < 0) {
      positions[to] = {...this.pieces[-1 - from]}
      fallen[-1 - from] -= 1
    } else {
      positions[to] = positions[from]
      positions[from] = null
    }
  }
}

export class CheckersBase extends GameType {
  constructor(width, height) {
    super(width, height, [
      { white: false, king: false },
      { white: false, king: true },
      { white: true, king: false },
      { white: true, king: true },
    ])
    this.totalPieces = Math.floor(width / 2) * Math.floor((height - 2) / 2)
  }

  sideToColor(side) {
    return side === 0 ? "white" : "black"
  }

  getWinner(fallen) {
    if (fallen[0] + fallen[1] >= this.totalPieces) return 0
    else if (fallen[2] + fallen[3] >= this.totalPieces) return 2
    return null
  }

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
