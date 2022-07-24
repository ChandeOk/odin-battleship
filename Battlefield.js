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

  checkIsSpaceBetweenShips(coords, direction) {
    let str = '';
    for (const ship of this.shipArray) {
      str += JSON.stringify(ship.coords) + ' ';
    }
    if (direction === 'vertical') {
      //ПРОВЕРКА ТОЛЬКО ПО ГОРИЗОНТАЛИ И ВЕРТИКАЛИ ДЛЯ ВЕРТИКАЛЬНЫХ КОРАБЛЕЙ ** ДЛЯ ПЕРВОЙ И ПОСЛЕДНЕЙ ЯЧЕЙКИ
      const fake = coords[0][0] + ',' + (coords[0][1] + 1);
      const fakeLast =
        coords[coords.length - 1][0] + ',' + (coords[coords.length - 1][1] + 1);
      const fake2 = coords[0][0] + ',' + (coords[0][1] - 1);
      const fakeLast2 =
        coords[coords.length - 1][0] + ',' + (coords[coords.length - 1][1] - 1);
      const fake3 = coords[0][0] - 1 + ',' + coords[0][1];
      const fakeLast3 =
        coords[coords.length - 1][0] + 1 + ',' + coords[coords.length - 1][1];

      const fakeVertMiddleArray = [];
      for (let i = 1; i < coords.length - 1; i++) {
        const fakeVertMiddle = coords[i][0] + ',' + (coords[i][1] + 1);
        const fakeVertMiddle2 = coords[i][0] + ',' + (coords[i][1] - 1);

        fakeVertMiddleArray.push(fakeVertMiddle, fakeVertMiddle2);
      }
      if (fakeVertMiddleArray.some((coord) => str.includes(coord))) {
        return true;
      }
      if (str.includes(fake) || str.includes(fakeLast)) {
        return true;
      }
      if (str.includes(fake2) || str.includes(fakeLast2)) {
        return true;
      }
      if (str.includes(fake3) || str.includes(fakeLast3)) {
        return true;
      }
    }

    if (direction === 'horizontal') {
      //ПРОВЕКА ДЛЯ ГОРИЗОТАНЛЬНЫХ КОРАБЛЕЙ
      const fakeHor = coords[0][0] + 1 + ',' + coords[0][1];
      const fakeHorLast =
        coords[coords.length - 1][0] + 1 + ',' + coords[coords.length - 1][1];
      const fakeHor2 = coords[0][0] - 1 + ',' + coords[0][1];
      const fakeHorLast2 =
        coords[coords.length - 1][0] - 1 + ',' + coords[coords.length - 1][1];
      const fakeHor3 = coords[0][0] + ',' + (coords[0][1] - 1);
      const fakeHorLast3 =
        coords[coords.length - 1][0] + ',' + (coords[coords.length - 1][1] + 1);

      const fakeHorMiddleArray = [];
      for (let i = 1; i < coords.length - 1; i++) {
        const fakeHorMiddle = coords[i][0] + 1 + ',' + coords[i][1];
        const fakeHorMiddle2 = coords[i][0] - 1 + ',' + coords[i][1];
        fakeHorMiddleArray.push(fakeHorMiddle, fakeHorMiddle2);
      }

      if (str.includes(fakeHor) || str.includes(fakeHorLast)) {
        return true;
      }
      if (str.includes(fakeHor2) || str.includes(fakeHorLast2)) {
        return true;
      }
      if (str.includes(fakeHor3) || str.includes(fakeHorLast3)) {
        return true;
      }
      if (fakeHorMiddleArray.some((coord) => str.includes(coord))) {
        return true;
      }
    }
  }

  placeShip(x, y, ship, direction) {
    let coords = [];
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length.length; i++) {
        coords.push([y - 1, x + i - 1]);
        ship.direction = direction;
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < ship.length.length; i++) {
        coords.push([y + i - 1, x - 1]);
        ship.direction = direction;
      }
    }
    ship.coords = coords;
    // debugger;

    if (
      this.checkIsShipsCrossed(coords) ||
      this.checkIsSpaceBetweenShips(coords, direction)
    ) {
      return 404;
    }

    this.shipArray.push(ship);

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

    // if (direction === 'vertical') this.checkIsSpaceBetweenShips(coords);
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
    let i = 0;
    // debugger;
    do {
      const max = 10;

      const randomX = Math.floor(Math.random() * (max - 1 + 1)) + 1;
      const randomY = Math.floor(Math.random() * (max - 1 + 1)) + 1;
      const randomDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';

      if (
        randomDirection === 'horizontal' &&
        10 - randomY < ships[i].length.length
      )
        continue;
      if (
        randomDirection === 'vertical' &&
        10 - randomX < ships[i].length.length
      )
        continue;

      if (this.placeShip(randomY, randomX, ships[i], randomDirection) !== 404)
        i++;
    } while (i < 5);
  }
}

export default Battlefield;
