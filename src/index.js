import './style.css';
import Player from './modules/player';
import { renderBoard, renderEnemy } from './modules/dom';

const p1 = new Player();
const enemy = new Player();
p1.generateShips();
enemy.generateShips();
renderBoard(p1);
renderEnemy(enemy, p1);


