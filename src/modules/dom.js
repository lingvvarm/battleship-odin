
export function renderBoard(player) {
  const boardObj = player.myBoard;
  const board = boardObj.board;
  const domBoard = document.querySelector('.p1-board');
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
      domBoard.appendChild(cell);
    }
  }
}

export function renderEnemy(enemy, player) {
  const boardObj = enemy.myBoard;
  const board = boardObj.board;
  const domBoard = document.querySelector('.p2-board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('enemy-cell');
      cell.addEventListener('click', (e) => {
        const res = boardObj.receiveAttack(i, j);
        if (res === false) return;
        if (res === 1) {
          cell.classList.add('cell-hitted');
          if (enemy.isAllSunk()) alert('P1 won!');
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
        renderBoard(player);
        if (player.isAllSunk()) alert("CPU won!");
      });
      if (typeof board[i][j] === 'object') {
        cell.classList.add('cell-with-ship');
      }
      domBoard.appendChild(cell);
    }
  }
}
