import './style.css';
import Player from './modules/player';
import DomController from './modules/dom';

function restart() {
  let domController = new DomController();
  domController.restartBtn.addEventListener('click', restart);
  let p1 = new Player();
  domController.renderBoard(p1);
}

restart();
