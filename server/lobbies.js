class BaseLobby {
  static nextID = 0

  constructor(type, code) {
    this.id = nextID++
    this.type = type
    this.code = code
  }
}

export class OpenGame extends BaseLobby {
  constructor({firstPlayer, takenSide, type, code}) {
    super(type, code)
    this.firstPlayer = firstPlayer
    this.takenSide = takenSide
  }
}

export class StartedGame extends BaseLobby {
  constructor(firstPlayer, secondPlayer) {
    this.players = [firstPlayer, secondPlayer]
    this.lastTurn = {
      player: secondPlayer,
      moves: [],
      killed: []
    }
  }

  getLastTurn(player) {
    return this.lastTurn.player === player ? null : this.lastTurn
  }

  makeAMove({ moves, killed}) {
    const player = this.players[(this.players.findIndex(this.lastTurn.player) + 1) % this.players.length]
    this.lastTurn = {player, moves, killed}
  }
}