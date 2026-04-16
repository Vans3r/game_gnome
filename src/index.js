import './styles/style.css';
import { Game } from './classes/game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init();
});
