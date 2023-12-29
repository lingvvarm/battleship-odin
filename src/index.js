import './style.css';
import Player from './modules/player';

const p1 = new Player();

p1.generateShips();

console.log(p1.myBoard.board);
