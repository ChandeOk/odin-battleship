class DOM {
  generateGameBoardArray(gameBoard, type = 'player') {
    const gridArray = gameBoard.map((row, i) => {
      const divArray = [];
      let index = 0;
      for (const element of row) {
        const div = document.createElement('div');
        div.textContent = element;
        if (div.textContent === '1' && type === 'player') {
          div.classList.add('ship--on-board');
        }
        if (div.textContent === '0') {
          div.classList.add('hit');
        }
        if (div.textContent === '-') {
          div.classList.add('miss');
        }
        div.dataset.id = `${i + 1},${index + 1}`;
        divArray.push(div);
        index++;
      }
      return divArray;
    });
    return gridArray;
  }

  appendGameBoardGrid(side, grid) {
    const target = document.querySelector(`.gameboard-grid-${side}`);
    console.log(target, side);
    target.append(...grid.flat());
  }

  appendCoords(side) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const arrayLettersDivs = [];
    const arrayNumsDivs = [];

    for (let i = 0; i < 10; i++) {
      const letter = document.createElement('div');
      letter.textContent = letters[i];
      const num = document.createElement('div');
      num.textContent = nums[i];

      arrayLettersDivs.push(letter);
      arrayNumsDivs.push(num);
    }

    document
      .querySelector(`.gameboard-${side} .letters`)
      .append(...arrayLettersDivs);
    document.querySelector(`.gameboard-${side} .nums`).append(...arrayNumsDivs);
  }

  createDraggableShips() {
    const parentElement = document.querySelector('.ships');
    const markup = `<div class="ships">
    <div
      class="carrier 5 ship ship"
      draggable="true"
      data-length="5"
      data-direction="horizontal"
      id="carrier"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="battleship 4 ship"
      draggable="true"
      data-length="4"
      data-direction="horizontal"
      id="battleship"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="destroyer 3 ship"
      draggable="true"
      data-length="3"
      data-direction="horizontal"
      id="destroyer"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="submarine 3 ship"
      draggable="true"
      data-length="3"
      data-direction="horizontal"
      id="submarine"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="boat 2 ship"
      draggable="true"
      data-length="2"
      data-direction="horizontal"
      id="boat"
    >
      <div></div>
      <div></div>
    </div>
    <button class="rotate">ROTATE</button>
  </div>`;

    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  createErrorMessage() {
    if (document.querySelector('.error')) return;
    const parentEl = document.querySelector('.buttons');
    const el = document.createElement('h2');
    el.textContent = 'Please place all ships';
    el.classList.add('error');
    parentEl.appendChild(el);
  }

  disableOpacityOnStart() {
    document.querySelector('.start').classList.remove('active');
  }

  createWinnerMessage(winner) {
    const parentEl = document.querySelector('.buttons');
    const el = document.createElement('h2');
    el.textContent = `${winner} WIN! 💪`;
    el.classList.add('winner');
    parentEl.appendChild(el);
  }

  deleteWinnerMessage() {
    if (document.querySelector('.winner'))
      document.querySelector('.winner').remove();
  }
}

export default new DOM();
