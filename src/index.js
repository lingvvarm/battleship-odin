import './style.css';
import Gameboard from './modules/gameboard';

let board = new Gameboard();

board.place_ship(6, 3, 4, 'vertical');
console.log(board.board);
