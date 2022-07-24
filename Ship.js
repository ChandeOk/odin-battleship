class Ship {
  length;

  constructor(length) {
    this.length = Array(length).fill(1);
  }

  hit(position) {
    this.length[position - 1] = 0;
    return this.length;
  }

  isSunk() {
    const result = this.length.some((cell) => cell === 1) ? false : true;
    return result;
  }
}

export default Ship;
