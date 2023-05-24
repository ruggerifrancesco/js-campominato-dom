// Load Main Game Button
window.addEventListener('load', () => {
    const startButton = document.getElementById('start-btn');
    const container = document.getElementById('container');
    const header = document.getElementById('header');
    const gameContainer = document.getElementById('game-container');
    const footer = document.querySelector('footer');
  
    startButton.addEventListener('click', () => {
      container.style.display = 'none';
      header.style.display = 'flex';
      gameContainer.classList.remove('hidden');
      footer.classList.remove('hidden');
    });
  });
  
// Start New Game
const startActualGameBtn = document.getElementById('play-btn');
const gameGridContainer = document.getElementById('grid-game-container');

startActualGameBtn.addEventListener ('click',
    function () {
      // To clear Grid with .innerHTML
      gameGridContainer.innerHTML = "";

      const bombCount = 16;
      const minRandom = 1;
      const maxRandom = 16;
      const bombNumbers = randomNumbersNotEqual(bombCount, minRandom, maxRandom); // Generate random bomb cell numbers
      console.log(randomNumbersNotEqual(16, 1, 16));
      // Test Prin 10 times array
      // for (let i = 0; i < 10; i++) {
        // console.log(randomNumbersNotEqual(16, 1, 16));
      // }
      generateGrid(bombNumbers);
    }
)

// Function to generate the grid
function generateGrid() {

  for (let i = 1; i <= 100; i++) {
    const gameCell = createElement('div', 'bomb-cell');
    const cellNumber = createElement('span', 'cell-number');
    cellNumber.textContent = i; // Set the cell number

    gameCell.addEventListener('click', function () {

      if (gameCell.classList.contains('cell-selected')) {
        gameCell.classList.remove('cell-selected');
        console.log('You unselected cell ' + cellNumber.textContent);
      } else {
        gameCell.classList.add('cell-selected');
        console.log('You selected cell ' + cellNumber.textContent);
      }
      
    });

    gameCell.appendChild(cellNumber); // Append the number element to the cell
    gameGridContainer.appendChild(gameCell);
  }
}

// Function to create new Element
function createElement (tagName, className) {
  const cellElement = document.createElement(tagName);
  cellElement.className += className;
  return cellElement;
}


// Function to create random numbers with no equals
function randomNumbersNotEqual (count, min, max) {
  const numbersNotEqual = [];
  while (numbersNotEqual.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (numbersNotEqual.indexOf(randomNumber) == -1) {
      numbersNotEqual.push(randomNumber);
    }
  }
  return numbersNotEqual;
}

