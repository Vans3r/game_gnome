export class ScoreManager {
  constructor() {
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.scoreElement = document.createElement('div');
    this.scoreElement.id = 'score';
    this.scoreElement.textContent = `Score: 0 | Missed: 0/5`;
    document.body.prepend(this.scoreElement);
  }

  addPoint() {
    this.score++;
    this.updateDisplay();
  }

  missGoblin() {
    this.missed++;
    this.updateDisplay();
    return this.missed >= this.maxMissed;
  }

  updateDisplay() {
    this.scoreElement.textContent = `Score: ${this.score} | Missed: ${this.missed}/${this.maxMissed}`;
  }

  getScore() {
    return this.score;
  }
}
