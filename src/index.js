require('./style.ccs')

function createGameBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    board.appendChild(cell);
  }
}

function createGnome() {
  const gnome = document.createElement('img');
  gnome.src = './images/gnome.png';
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

  newCell.appendChild(gnome);
}

document.addEventListener('DOMContentLoaded', () => {
  createGameBoard();
  const gnome = createGnome();
  const initialCell = getRandomCell();
  initialCell.appendChild(gnome);
  setInterval(() => moveGnome(gnome), 2000);
});



