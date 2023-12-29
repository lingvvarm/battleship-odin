import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => Array(10).fill(0));
  }

  place_ship(row, col, length, placing) {
    if (this.board[row][col]) return false;
    const ship = new Ship(length);

    if (placing === 'horizontal') {
      if (col + length > 10) return false;
      for (let i = col; i < col + length; i++) {
        this.board[row][i] = ship;
      }
    }
    if (placing === 'vertical') {
      if (row + length > 10) return false;
      for (let i = row; i < row + length; i++) {
        this.board[i][col] = ship;
      }
    }
    this.reserve_around(row, col, length, placing);
    return true;
  }

  reserve_around(row, col, length, placing) {
    const low = row - 1;
    const left = col - 1;
    let up;
    let right;
    if (placing === 'horizontal') {
      up = row + 1;
      right = col + length;
    }
    if (placing === 'vertical') {
      up = row + length;
      right = col + 1;
    }
    for (let i = low; i <= up; i++) {
      for (let j = left; j <= right; j++) {
        if (i < 10 && i >= 0 && j < 10 && j >= 0) {
          if (this.board[i][j] === 0) this.board[i][j] = 1;
        }
      }
    }
  }

  receiveAttack(row, col) {
    if (row < 10 && row >= 0 && col < 10 && col >= 0) {
      if (this.board[row][col] === -1) return false;
      if (typeof this.board[row][col] === 'object') {
        this.board[row][col].hit(row, col);
      } else {
        this.board[row][col] = 1;
        return [row, col];
      }
    }
  }

  allSunk() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j]?.sunk === false) return false;
      }
    }
    return true;
  }
}
