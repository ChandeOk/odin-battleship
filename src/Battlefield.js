class Battlefield {
  table;
  shipArray = [];
  isGameOver = false;

  createTable() {
    const table = Array(10)
      .fill()
      .map((el) => Array(10).fill('o'));
    this.table = table;

    return this.table;
  }

  placeShip(x, y, ship, direction) {
    let coords = [];
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length.length; i++) {
        this.table[y][x + i] = 1;
        coords.push([y, x + i]);
        ship.direction = direction;
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length.length; i++) {
        this.table[y + i][x] = 1;
        coords.push([y + i, x]);
        ship.direction = direction;
      }
    }

    ship.coords = coords;
    this.shipArray.push(ship);
  }

  recieveAttack(x, y) {
    const isShip = this.shipArray.some((ship) =>
      ship.coords.some((coords) => JSON.stringify(coords) === `[${y},${x}]`)
    );
    const targetShip = this.shipArray.find((ship) =>
      ship.coords.some((coords) => JSON.stringify(coords) === `[${y},${x}]`)
    );

    if (isShip && targetShip.direction === 'vertical') {
      targetShip.hit(
        targetShip.coords.findIndex(
          (coordinates) => JSON.stringify(coordinates) === `[${y},${x}]`
        ) + 1
      );
      this.table[y][x] = 0;
    }
    if (isShip && targetShip.direction === 'horizontal') {
      targetShip.hit(
        targetShip.coords.findIndex(
          (coordinates) => JSON.stringify(coordinates) === `[${y},${x}]`
        ) + 1
      );
      this.table[y][x] = 0;
    }

    if (!isShip) this.table[y][x] = '-';

    this.isGameOver = this.shipArray.every((ship) => ship.isSunk());
    // return this.shipArray;
    return this.isGameOver;
    return targetShip;
  }
}

export default Battlefield;
