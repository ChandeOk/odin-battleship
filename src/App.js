'use strict';

import Battlefield from './Battlefield.js';
import DOM from './DOM.js';
import Player from './Player.js';
import Ship from './Ship.js';

class App {
  gameboardLeftGrid;
  gameboardRightGrid;
  player;
  gameboardLeft;
  pc;
  gameboardRight;
  players = [];
  isGameOver = false;

  carrier = document.querySelector('.carrier');
  battleship = document.querySelector('.battleship');
  destroyer = document.querySelector('.destroyer');
  submarine = document.querySelector('.submarine');
  boat = document.querySelector('.boat');

  constructor() {
    this.player = new Player('person');
    this.gameboardLeft = new Battlefield();
    this.gameboardLeft.createTable();

    this.pc = new Player('pc');
    this.gameboardRight = new Battlefield();
    this.gameboardRight.createTable();

    this.players.push(this.player, this.pc);
    console.log(this.players);
    console.log('start');
  }

  init() {
    this.gameboardLeftGrid = DOM.generateGameBoardArray(
      this.gameboardLeft.table
    );
    console.log(this.gameboardLeftGrid);
    DOM.appendGameBoardGrid('left', this.gameboardLeftGrid);
    DOM.appendCoords('left');

    this.gameboardRightGrid = DOM.generateGameBoardArray(
      this.gameboardRight.table
    );
    console.log(this.gameboardRightGrid);
    DOM.appendGameBoardGrid('right', this.gameboardRightGrid);
    DOM.appendCoords('right');
  }

  addHandler(event, side = 'right') {
    if (this.isGameOver) return;
    const gameboardElement = document.querySelector(`.gameboard-${side}`);
    this.players[0].isActive = true;
    console.log(this.players);
    gameboardElement.addEventListener('click', (e) => {
      if (!this.player.isActive) return;
      const clickedCell = e.target.closest('div');
      const gameboardGrid = document.querySelector(`.gameboard-grid-${side}`);
      console.log(clickedCell);
      const cellCoords = clickedCell.dataset.id;
      console.log(cellCoords);
      const [x, y] = cellCoords.split(',');
      console.log(x, y);
      const gameBoardSide =
        side === 'left' ? this.gameboardLeft : this.gameboardRight;
      console.log(this.gameboardLeft);

      gameBoardSide.recieveAttack(...this.player.attack(+y, +x));
      gameboardGrid.innerHTML = '';
      DOM.appendGameBoardGrid(
        `${side}`,
        DOM.generateGameBoardArray(gameBoardSide.table)
      );

      this.pc.isActive = true;
      this.pcTurn();
      console.log(gameBoardSide.isGameOver);
      console.log(this.players);
    });
  }

  pcTurn() {
    if (!this.pc.isActive) return;
    console.log('PC MOVE');
    if (this.gameboardLeft.isGameOver || this.gameboardRight.isGameOver) {
      this.gameOver();
      return;
    }

    const gameboardGrid = document.querySelector(`.gameboard-grid-left`);

    this.gameboardLeft.recieveAttack(...this.pc.randomAttack());
    gameboardGrid.innerHTML = '';
    DOM.appendGameBoardGrid(
      'left',
      DOM.generateGameBoardArray(this.gameboardLeft.table)
    );

    this.player.isActive = true;
  }

  gameOver() {
    this.isGameOver = true;
    console.log('GAME OVER');
    return;
  }

  setShipLength(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.length);
    event.dataTransfer.setData('direction', event.target.dataset.direction);
    console.log(event.dataTransfer.getData('text/plain'));
  }

  dragAndDropHandler() {
    const gameboardGrid = document.querySelector(`.gameboard-grid-left`);

    this.carrier.addEventListener('dragstart', this.setShipLength);
    this.battleship.addEventListener('dragstart', this.setShipLength);
    this.destroyer.addEventListener('dragstart', this.setShipLength);
    this.submarine.addEventListener('dragstart', this.setShipLength);
    this.boat.addEventListener('dragstart', this.setShipLength);

    document.addEventListener('dragover', (event) => {
      // prevent default to allow drop
      event.preventDefault();
    });

    gameboardGrid.addEventListener('drop', (event) => {
      event.preventDefault();
      const target = event.target.closest('div');
      const [x, y] = target.dataset.id.split(',');
      const ship = new Ship(+event.dataTransfer.getData('text/plain'));
      const direction = event.dataTransfer.getData('direction');
      if (direction === 'horizontal' && 10 - y < ship.length.length - 1) return;
      if (direction === 'vertical' && 10 - x < ship.length.length - 1) return;
      // if(this.gameboardLeft.shipArray.some(ship=>ship.coords.some(coord=>JSON.stringify(coord)===  )))return
      console.log(this.gameboardLeft.shipArray);
      console.log(this.gameboardLeft.table);
      // debugger;

      // if (this.gameboardLeft.placeShip(+y, +x, ship, direction) === 404) return;
      this.gameboardLeft.placeShip(+y, +x, ship, direction);
      gameboardGrid.innerHTML = '';
      DOM.appendGameBoardGrid(
        'left',
        DOM.generateGameBoardArray(this.gameboardLeft.table)
      );
    });
  }

  rotateHandler() {
    document.querySelector('.rotate').addEventListener('click', () => {
      const ships = document.querySelectorAll('.ship');
      ships.forEach((ship) => {
        ship.classList.toggle('vertical');
        ship.dataset.direction =
          ship.dataset.direction === 'horizontal' ? 'vertical' : 'horizontal';
      });
    });
  }

  generatePcShips() {
    this.gameboardRight.placeRandom([
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
      new Ship(5),
    ]);
    const gameboardGrid = document.querySelector('.gameboard-grid-right');

    console.log(this.gameboardRight.shipArray);
    gameboardGrid.innerHTML = '';
    console.log(this.gameboardRight.table);
    DOM.appendGameBoardGrid(
      'right',
      DOM.generateGameBoardArray(this.gameboardRight.table)
    );
  }
}

// document
//   .querySelector('.gameboard-grid-left')
//   .addEventListener('drop', function (event) {
//     event.preventDefault();
//     console.log('ook');
//     console.log(event.target.closest('div'));
//     const target = event.target.closest('div');
//     const [x, y] = target.dataset.id.split(',');
//     const carrier = new Ship(4);
//     app.gameboardLeft.placeShip(+y, +x, carrier, 'horizontal');
//     console.log(app.gameboardLeft.table);
//     this.innerHTML = '';
//     DOM.appendGameBoardGrid(
//       'left',
//       DOM.generateGameBoardArray(app.gameboardLeft.table)
//     );

//     // for (let i = 0; i < carrier.length.length; i++) {
//     //   const wtf = document.querySelector(`[data-id='${+x},${+y + i}']`);
//     //   wtf.style.backgroundColor = 'black';
//     // }
//   });

export default App;