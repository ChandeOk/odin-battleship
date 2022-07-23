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

  checkIsShipsCrossed(coords) {
    return coords.some((coord) =>
      JSON.stringify(this.shipArray).includes(JSON.stringify(coord))
    );
  }

  checkIsSpaceBetweenShips() {}

  placeShip(x, y, ship, direction) {
    let coords = [];
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length.length; i++) {
        // this.table[y - 1][x + i - 1] = 1;
        coords.push([y - 1, x + i - 1]);
        ship.direction = direction;
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length.length; i++) {
        // this.table[y + i - 1][x - 1] = 1;
        coords.push([y + i - 1, x - 1]);
        ship.direction = direction;
      }
    }
    ship.coords = coords;
    // debugger;
    if (this.checkIsShipsCrossed(coords)) {
      console.log('wtf');
      return 404;
    }

    // debugger;

    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length.length; i++) {
        this.table[y - 1][x + i - 1] = 1;
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length.length; i++) {
        this.table[y + i - 1][x - 1] = 1;
      }
    }

    this.shipArray.push(ship);
    console.log(this.shipArray);
    console.log(JSON.stringify(this.shipArray));
  }

  recieveAttack(x, y) {
    const isShip = this.shipArray.some((ship) =>
      ship.coords.some(
        (coords) => JSON.stringify(coords) === `[${y - 1},${x - 1}]`
      )
    );
    const targetShip = this.shipArray.find((ship) =>
      ship.coords.some(
        (coords) => JSON.stringify(coords) === `[${y - 1},${x - 1}]`
      )
    );

    if (isShip && targetShip.direction === 'vertical') {
      targetShip.hit(
        targetShip.coords.findIndex(
          (coordinates) => JSON.stringify(coordinates) === `[${y - 1},${x - 1}]`
        ) + 1
      );
      this.table[y - 1][x - 1] = 0;
    }
    if (isShip && targetShip.direction === 'horizontal') {
      targetShip.hit(
        targetShip.coords.findIndex(
          (coordinates) => JSON.stringify(coordinates) === `[${y - 1},${x - 1}]`
        ) + 1
      );
      this.table[y - 1][x - 1] = 0;
    }

    if (!isShip) this.table[y - 1][x - 1] = '-';

    this.isGameOver = this.shipArray.every((ship) => ship.isSunk());
    // return this.shipArray;
    return this.isGameOver;
  }

  placeRandom(ships) {
    console.log(ships);
    let i = 0;
    // debugger;
    do {
      const randomX = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      const randomY = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      const randomDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';

      if (
        10 - randomX < ships[i].length.length ||
        10 - randomY < ships[i].length.length
      )
        continue;

      if (this.placeShip(randomX, randomY, ships[i], randomDirection) !== 404)
        i++;
    } while (i < 5);
  }
}

export default Battlefield;
