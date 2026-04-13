import './style.css';
import gnomeImage from './images/gnome.png'

const FIELD_SIZE = 16;
const MOVE_INTERVAL = 2000

function createGameBoard() {
  
 const board = document.getElementById('game-board');
  if (!board) {
    throw new Error('Game board element not found');
  }
  board.innerHTML = '';

  for (let i = 0; i < FIELD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    board.append(cell);
  }
}

function createGnome() {
  const gnome = document.createElement('img');
  gnome.src = gnomeImage;
  gnome.alt = 'Gnome';
  return gnome;
}

function getRandomCell() {
  const cells = document.querySelectorAll('.cell');
  const randomIndex = Math.floor(Math.random() * cells.length);
  return cells[randomIndex];
}

function moveGnome(gnome) {
  const currentParent = gnome.parentElement;
  let newCell;

  do {
    newCell = getRandomCell();
  } while (newCell === currentParent);

  newCell.append(gnome);
}

let gnomeInterval
let escapeKeyHandler

document.addEventListener('DOMContentLoaded', () => {
  createGameBoard();
  const gnome = createGnome();
  const initialCell = getRandomCell();
  initialCell.append(gnome);
  gnomeInterval = setInterval(() => moveGnome(gnome), MOVE_INTERVAL);
  
  escapeKeyHandler = (event) => {
    if (event.key === 'Escape') {
      stopGame();
      document.removeEventListener('keydown', escapeKeyHandler);
    }
  };

  document.addEventListener('keydown', escapeKeyHandler);
});


function stopGame() {
  if (gnomeInterval) {
    clearInterval(gnomeInterval); 
    gnomeInterval = null;
  }
}

 document.addEventListener('keydown',(event) => {
    if (event.key === 'Escape') {
      stopGame();
    }
  });



