export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.hitted = [];
  }

  hit(row, col) {
    if (this.hitted.some((elem) => elem[0] === row && elem[1] === col)) {
      return false;
    }
    this.hits += 1;
    this.hitted.push([row, col]);
    this.isSunk();
    return true;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
