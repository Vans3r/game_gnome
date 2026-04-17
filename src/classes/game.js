import { Goblin } from './goblin.js';
import { ScoreManager } from './scoreManager.js';
import goblinImage from '../images/goblin.png';

export class Game {
  constructor() {
    this.FIELD_SIZE = 16;
    this.GOBLIN_DURATION = 1000;
    this.gameBoard = null;
    this.goblin = null;
    this.scoreManager = new ScoreManager();
    this.isGameRunning = false;
    this.goblinInterval = null;
    this.previousCell = null;
    this.keydownHandler = null; 
  }

  init() {
    this.createGameBoard();
    this.goblin = new Goblin(goblinImage, this.scoreManager);
    this.goblin.create();
    this.setupEventListeners();
    this.startGame();
  }

  createGameBoard() {
    this.gameBoard = document.getElementById('game-board');
    if (!this.gameBoard) {
      throw new Error('Game board element not found');
    }
    this.gameBoard.innerHTML = '';

    for (let i = 0; i < this.FIELD_SIZE; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell-${i}`;
      this.gameBoard.append(cell);
    }
  }

  getRandomCell() {
    const cells = document.querySelectorAll('.cell');
    let randomIndex;
    let previousIndex = -1;

    if (this.previousCell) {
      previousIndex = Array.from(cells).indexOf(this.previousCell);
    }

    do {
      randomIndex = Math.floor(Math.random() * cells.length);
    } while (randomIndex === previousIndex);

    this.previousCell = cells[randomIndex];
    return cells[randomIndex];
  }

  startGoblinAppearance() {
    this.goblinInterval = setInterval(() => {
      if (!this.isGameRunning) return;

      const randomCell = this.getRandomCell();
      this.goblin.appearInCell(randomCell);

      setTimeout(() => {
        if (this.goblin.currentCell === randomCell) {
          this.goblin.disappear();
          if (this.scoreManager.missGoblin()) {
            this.endGame();
          }
        }
      }, this.GOBLIN_DURATION);
    }, 2000);
  }

  setupEventListeners() {
    this.keydownHandler = (event) => {
      if (event.key === 'Escape') {
        this.endGame();
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  startGame() {
    this.isGameRunning = true;
    this.startGoblinAppearance();
  }

  endGame() {
    if (this.goblinInterval) {
      clearInterval(this.goblinInterval);
      this.goblinInterval = null;
    }
    this.isGameRunning = false;
    if (this.goblin) {
      this.goblin.remove();
    }
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }

    alert(`Игра окончена! Ваш счёт: ${this.scoreManager.getScore()}`);

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.innerHTML = '';
    });
    this.previousCell = null;
  }
}
