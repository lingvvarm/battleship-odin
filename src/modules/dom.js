import _ from 'lodash';
import Player from "./player";

export default class DomController {
  constructor() {
    this.boardText = document.querySelector('.p1-name');
    this.enemyBoard = document.querySelector('.p2-board');
    this.lengths = [1, 1, 2, 2, 3, 3, 4, 4];
    this.attachmouselistener = true;
    this.direction = 'vertical';
    this.backup = [];
    this.enemy = new Player();
    this.gameFinished = false;
    this.axisBtn = document.querySelector('.axis-btn');
    this.p1Section = document.querySelector('.p1-section');
    this.restartBtn = document.createElement('button');

    this.restartBtn.classList.add('axis-btn');
    this.restartBtn.textContent = 'Restart';
    this.boardText.textContent = 'Place your ships!';

    this.enemyBoard.replaceChildren();
    this.changeAxis = this.changeAxis.bind(this);
    this.axisBtn.addEventListener('click', this.changeAxis);
    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.changeAxis();
    });
  }

  changeAxis() {
    if (this.direction === 'horizontal') {
      this.direction = 'vertical';
      this.axisBtn.textContent = `Orientation: ${this.direction}`;
      return;
    }
    if (this.direction === 'vertical') {
      this.direction = 'horizontal';
      this.axisBtn.textContent = `Orientation: ${this.direction}`;
      return;
    }
  }

  renderBoard(player, renderEnemy = false) {
    const boardObj = player.myBoard;
    const board = boardObj.board;
    let domBoard = document.querySelector('.p1-board');
    if (renderEnemy) domBoard = document.querySelector('.p2-board');
    domBoard.replaceChildren();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        if (typeof board[i][j] === 'object') {
          if (board[i][j].hitted.some((elem) => elem[0] === i && elem[1] === j)) {
            cell.classList.add('cell-hitted');
          } else {
            cell.classList.add('cell-with-ship');
          }
        }
        if (boardObj.missed.some((elem) => elem[0] === i && elem[1] === j)) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          cell.appendChild(dot);
        }
        if (this.lengths.length === 0) this.axisBtn.remove();
        if (this.lengths.length > 0) {
          cell.addEventListener('mouseleave', (e) => {
            player.myBoard.board = this.backup;
            this.attachmouselistener = true;
            this.renderBoard(player);
          });
          cell.addEventListener('click', (e) => {
            player.myBoard.board = this.backup;
            if (boardObj.place_ship(i, j, this.lengths[this.lengths.length - 1], this.direction)) {
              this.lengths.pop();
              this.renderBoard(player);
            }
            if (this.lengths.length === 0) {
              this.boardText.textContent = 'You';
              this.enemy.generateShips();
              this.renderEnemy(this.enemy, player);
            }
          });
          if (this.attachmouselistener) {
            cell.addEventListener('mouseenter', (e) => {
              this.backup = _.cloneDeep(boardObj.board);
              boardObj.place_ship(i, j, this.lengths[this.lengths.length - 1], this.direction);
              this.attachmouselistener = false;
              this.renderBoard(player);
            });
          }
        }
        domBoard.appendChild(cell);
      }
    }
  }

  renderEnemy(enemy, player) {
    const boardObj = enemy.myBoard;
    const board = boardObj.board;
    const domBoard = document.querySelector('.p2-board');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('enemy-cell');
        if (!this.gameFinished) {
          cell.addEventListener('click', (e) => {
            const res = boardObj.receiveAttack(i, j);
            if (res === false) return;
            if (res === 1) {
              cell.classList.add('cell-hitted');
              if (enemy.isAllSunk()) {
                this.boardText.textContent = 'You won!';
                this.renderBoard(enemy, true);
                this.gameFinished = true;
                this.p1Section.appendChild(this.restartBtn);
                return;
              }
            }
            if (res === 0) {
              const dot = document.createElement('div');
              dot.classList.add('dot');
              cell.appendChild(dot);
            }
            let flag = false;
            while (flag === false) {
              flag = enemy.fire(...enemy.randCell(), player);
            }
            this.renderBoard(player);
            if (player.isAllSunk()) {
              this.boardText.textContent = 'CPU won!';
              this.renderBoard(enemy, true);
              this.gameFinished = true;
              this.p1Section.appendChild(this.restartBtn);
              return;
            }
          });
        }
        if (typeof board[i][j] === 'object') {
          cell.classList.add('cell-with-ship');
        }
        domBoard.appendChild(cell);
      }
    }
  }
}
