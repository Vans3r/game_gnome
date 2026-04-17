export class Goblin {
  constructor(imagePath, scoreManager) {
    this.imagePath = imagePath;
    this.element = null;
    this.currentCell = null;
    this.scoreManager = scoreManager;
    this.clickHandler = null; 
  }

  create() {
    if (this.element) {
      this.remove();
    }

    this.element = document.createElement('img');
    this.element.src = this.imagePath;
    this.element.alt = 'Goblin';
    this.element.className = 'goblin';

    this.clickHandler = this.onClick.bind(this);
    this.element.addEventListener('click', this.clickHandler);
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
  remove() {
    if (this.element && this.clickHandler) {
      this.element.removeEventListener('click', this.clickHandler);
    }
    if (this.currentCell && this.element) {
      this.currentCell.removeChild(this.element);
      this.currentCell = null;
    }
    this.element = null;
    this.clickHandler = null;
  }
}
