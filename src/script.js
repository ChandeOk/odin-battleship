'use strict';

import App from './App.js';
import DOM from './DOM.js';
import Ship from './Ship.js';

// import Battlefield from './Battlefield.js';
// import DOM from './DOM.js';
// import Player from './Player.js';
// import Ship from './Ship.js';

// console.log('start');

// const player = new Player('person');
// const gameboardLeft = new Battlefield();
// const playerShip1 = new Ship(3);
// const playerShip2 = new Ship(4);
// gameboardLeft.createTable();
// gameboardLeft.placeShip(1, 3, playerShip1, 'horizontal');
// gameboardLeft.placeShip(4, 5, playerShip2, 'vertical');

// const pc = new Player('pc');
// const gameboardRight = new Battlefield();
// gameboardRight.createTable();

// const gameboardLeftGrid = DOM.generateGameBoardArray(gameboardLeft.table);
// console.log(gameboardLeftGrid);
// DOM.appendGameBoardGrid('left', gameboardLeftGrid);
// DOM.appendCoords('left');

// const gameboardRightGrid = DOM.generateGameBoardArray(gameboardRight.table);
// console.log(gameboardRightGrid);
// DOM.appendGameBoardGrid('right', gameboardRightGrid);
// DOM.appendCoords('right');

// const gameboardRightElement = document.querySelector('.gameboard-right');
// gameboardRightElement.addEventListener('click', (e) => {
//   const clickedCell = e.target.closest('div');
//   console.log(clickedCell);
//   const coords = clickedCell.dataset.id;
//   console.log(coords);
//   const [x, y] = coords.split(',');
//   console.log(x, y);
//   gameboardRight.recieveAttack(+x, +y);
// });

// const gameboardLeftElement = document.querySelector('.gameboard-left');
// gameboardLeftElement.addEventListener('click', (e) => {
//   const clickedCell = e.target.closest('div');
//   const gameboardGrid = document.querySelector('.gameboard-grid-left');
//   console.log(clickedCell);
//   const coords = clickedCell.dataset.id;
//   console.log(coords);
//   const [x, y] = coords.split(',');
//   console.log(x, y);
//   gameboardLeft.recieveAttack(+y, +x);
//   gameboardGrid.innerHTML = '';
//   DOM.appendGameBoardGrid(
//     'left',
//     DOM.generateGameBoardArray(gameboardLeft.table)
//   );
//   console.log(gameboardLeft.isGameOver);
// });

let app = new App();
app.init();

document
  .querySelector('.start')
  .addEventListener('click', app.addHandler.bind(app));

document.querySelector('.play-again').addEventListener('click', () => {
  DOM.createDraggableShips();
  document
    .querySelectorAll('.gameboard *')
    .forEach((elem) => (elem.innerHTML = ''));

  app = new App();
  app.init();
  document
    .querySelector('.start')
    .addEventListener('click', app.addHandler.bind(app));

  app.dragAndDropHandler();
  app.rotateHandler();
  app.generatePcShips();
});

app.dragAndDropHandler();
app.rotateHandler();
app.generatePcShips();

// app.gameboardRight.checkIsSpaceBetweenShips();
// //test

// const carrier = document.querySelector('.carrier');
// carrier.addEventListener('dragstart', (event) => {
//   event.dataTransfer.setData('text/plain', event.target.dataset.length);
//   console.log(event.dataTransfer.getData('text/plain'));
// });
// document.addEventListener('dragover', (event) => {
//   // prevent default to allow drop
//   event.preventDefault();
// });

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
