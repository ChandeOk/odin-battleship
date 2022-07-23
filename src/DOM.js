class DOM {
  generateGameBoardArray(gameBoard) {
    const gridArray = gameBoard.map((row, i) => {
      const divArray = [];
      let index = 0;
      for (const element of row) {
        const div = document.createElement('div');
        div.textContent = element;
        if (div.textContent === '1') div.style.backgroundColor = 'black';
        div.dataset.id = `${i + 1},${index + 1}`;
        divArray.push(div);
        index++;
      }
      return divArray;
    });
    return gridArray;
  }

  generateGameBoardGrid(gameBoard) {
    const gridArray = this.generateGameBoardArray(gameBoard);
  }

  appendGameBoardGrid(side, grid) {
    const target = document.querySelector(`.gameboard-grid-${side}`);
    console.log(target, side);
    // grid.forEach(row=>{
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

  addHandler(event, handler) {
    const gameboardRightElement = document.querySelector('.gameboard-right');
    gameboardRightElement.addEventListener('c');
  }
}

export default new DOM();
