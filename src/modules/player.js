import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.myBoard = new Gameboard();
    this.myTurn = false;
  }

  getTurn() {
    this.myTurn = true;
  }

  passTurn(enemy) {
    enemy.getTurn();
  }

  fire(row, col, enemy) {
    enemy.board.receiveAttack(row, col);
  }

  randCell() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return [row, col];
  }

  randPlacing() {
    const placings = ['horizontal', 'vertical'];
    return placings[Math.floor(Math.random() * placings.length)];
  }

  randomShip(length) {
    let i = 0;
    while (true) {
      if (this.myBoard.place_ship(...this.randCell(), length, this.randPlacing())) return true;
      if (i === 30) return false;
      i += 1;
    }
  }

  generateShips() {
    for (let i = 4; i >= 1; i -= 1) {
      for (let j = 0; j < 2; j++) {
        this.randomShip(i);
      }
    }
  }
}
