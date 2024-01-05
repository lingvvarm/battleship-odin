import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = Array.from(Array(10), () => Array(10).fill(0));
    this.missed = [];
  }

  place_ship(row, col, length, placing) {
    if (this.board[row][col]) return false;
    const ship = new Ship(length);
    const cells_to_place = [];

    if (placing === 'horizontal') {
      if (col + length > 10) return false;
      for (let i = col; i < col + length; i++) {
        cells_to_place.push([row, i]);
      }
    }
    if (placing === 'vertical') {
      if (row + length > 10) return false;
      for (let i = row; i < row + length; i++) {
        cells_to_place.push([i, col]);
      }
    }
    if (cells_to_place.every((elem) => this.board[elem[0]][elem[1]] === 0)) {
      cells_to_place.forEach(([x, y]) => {
        this.board[x][y] = ship;
      });
      return this.reserve_around(row, col, length, placing);
    }
    return false;
  }

  reserve_around(row, col, length, placing, unreserve=false) {
    let reserved = [];
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
        reserved.push([i, j]);
        if (i < 10 && i >= 0 && j < 10 && j >= 0) {
          if (unreserve) {
            this.board[i][j] = 0;
          } else if (this.board[i][j] === 0) {
            this.board[i][j] = 1;
          }
        }
      }
    }
    return reserved;
  }

  receiveAttack(row, col) {
    if (row < 10 && row >= 0 && col < 10 && col >= 0) {
      if (typeof this.board[row][col] === 'object') {
        if (this.board[row][col].hit(row, col) === false) return false;
        return 1;
      }
      // this.board[row][col] = 1;
      if (this.missed.some((elem) => elem[0] === row && elem[1] === col)) return false;
      this.missed.push([row, col]);
      return 0;
    }
    return false;
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
