export default class Game {
    constructor() {
      this.state = [1, 7]
      this.observers = []
    }
    
    emitChange() {
      const pos = this.state
      this.observers.forEach((o) => o && o(pos))
    }
  
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {this.observers = this.observers.filter((t) => t !== o)}
    }
  
    movePiece(x, y) {
    }
  
    canMovePiece(toX, toY) {
    }
  }