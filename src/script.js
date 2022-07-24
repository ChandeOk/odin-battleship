'use strict';

import App from './App.js';
import DOM from './DOM.js';

let app = new App();
app.init();

document
  .querySelector('.start')
  .addEventListener('click', app.addHandler.bind(app));

document.querySelector('.play-again').addEventListener('click', () => {
  DOM.createDraggableShips();
  DOM.disableOpacityOnStart();
  DOM.deleteWinnerMessage();
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
