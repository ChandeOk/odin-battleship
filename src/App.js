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
  winner;

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
  }

  init() {
    this.gameboardLeftGrid = DOM.generateGameBoardArray(
      this.gameboardLeft.table
    );
    DOM.appendGameBoardGrid('left', this.gameboardLeftGrid);
    DOM.appendCoords('left');

    this.gameboardRightGrid = DOM.generateGameBoardArray(
      this.gameboardRight.table,
      'pc'
    );
    DOM.appendGameBoardGrid('right', this.gameboardRightGrid);
    DOM.appendCoords('right');
  }

  addHandler(event, side = 'right') {
    if (this.isGameOver) return;
    if (document.querySelectorAll('.ship').length !== 0) {
      DOM.createErrorMessage();
      return;
    }
    if (document.querySelector('.error'))
      document.querySelector('.error').remove();

    document.querySelector('.start').classList.add('active');

    const gameboardElement = document.querySelector(`.gameboard-${side}`);
    this.players[0].isActive = true;
    gameboardElement.addEventListener('click', (e) => {
      if (!this.player.isActive) return;
      const clickedCell = e.target.closest('div');
      const gameboardGrid = document.querySelector(`.gameboard-grid-${side}`);
      const cellCoords = clickedCell.dataset.id;
      const [x, y] = cellCoords.split(',');
      const gameBoardSide =
        side === 'left' ? this.gameboardLeft : this.gameboardRight;

      gameBoardSide.recieveAttack(...this.player.attack(+y, +x));
      gameboardGrid.innerHTML = '';
      DOM.appendGameBoardGrid(
        `${side}`,
        DOM.generateGameBoardArray(gameBoardSide.table, 'pc')
      );

      if (this.gameboardLeft.isGameOver || this.gameboardRight.isGameOver) {
        this.gameOver();
        return;
      }

      this.pc.isActive = true;
      this.pcTurn();
    });
  }

  pcTurn() {
    if (!this.pc.isActive) return;
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
    this.winner = this.gameboardRight.isGameOver ? 'Player' : 'PC';
    DOM.createWinnerMessage(this.winner);
    return;
  }

  setShipLength(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.length);
    event.dataTransfer.setData('direction', event.target.dataset.direction);
    event.dataTransfer.setData('id', event.target.id);
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

      // debugger;

      const isOk = this.gameboardLeft.placeShip(+y, +x, ship, direction);
      gameboardGrid.innerHTML = '';
      DOM.appendGameBoardGrid(
        'left',
        DOM.generateGameBoardArray(this.gameboardLeft.table)
      );

      const shipElement = document.getElementById(
        event.dataTransfer.getData('id')
      );

      if (isOk !== 404) shipElement.remove();
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

    gameboardGrid.innerHTML = '';
    DOM.appendGameBoardGrid(
      'right',
      DOM.generateGameBoardArray(this.gameboardRight.table, 'pc')
    );
  }
}

export default App;
