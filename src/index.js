import './style.css';
import Player from './modules/player';
import DomController from './modules/dom';

const domController = new DomController();
const p1 = new Player();
const enemy = new Player();
enemy.generateShips();
domController.renderEnemy(enemy, p1);
domController.renderBoard(p1);

// manual_place_ships(p1);
