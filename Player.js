class Player {
  isActive;
  type;
  moves = [];

  constructor(type) {
    this.type = type;
  }

  attack(x, y) {
    if (this.moves.some((move) => JSON.stringify(move) === `[${x},${y}]`))
      return;

    this.moves.push([x, y]);
    this.isActive = false;
    return [x, y];
  }

  randomAttack() {
    const randomX = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    const randomY = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

    if (
      this.moves.some(
        (move) => JSON.stringify(move) === `[${randomX},${randomY}]`
      )
    ) {
      console.log('SAME POINT');
      return this.randomAttack();
    } else {
      this.moves.push([randomX, randomY]);
      this.isActive = false;
    }

    return [randomX, randomY];
  }
}

export default Player;
