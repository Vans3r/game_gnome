export class Goblin {
  constructor(imagePath, scoreManager) {
    this.imagePath = imagePath;
    this.element = null;
    this.currentCell = null;
    this.scoreManager = scoreManager;
  }

  create() {
    this.element = document.createElement('img');
    this.element.src = this.imagePath;
    this.element.alt = 'Goblin';
    this.element.className = 'goblin';
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  appearInCell(cell) {
    cell.innerHTML = '';
    cell.append(this.element);
    this.currentCell = cell;
  }

  disappear() {
    if (this.currentCell) {
      this.currentCell.innerHTML = '';
      this.currentCell = null;
    }
  }

  onClick() {
    if (this.currentCell) {
      console.log('Goblin clicked!');
      this.scoreManager.addPoint();
      this.disappear();
    }
  }
}
