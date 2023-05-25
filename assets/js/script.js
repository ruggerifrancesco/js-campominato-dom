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

let clearedCellsCount = 0; // Variable to track the number of cleared cells
let bombsHitCount = 0; // Variable to track the number of bombs hit
let gameEnded = false; // Variable to track if the game has ended

startActualGameBtn.addEventListener ('click',
    function () {
       // Clear the console
      console.clear();

      clearedCellsCount = 0; 
      bombsHitCount = 0; 
      gameEnded = false;

      // To clear Grid with .innerHTML
      gameGridContainer.innerHTML = "";

      // Inizialize Game
      const bombCount = 16;
      const minRandom = 1;
      const maxRandom = 100;
      const bombNumbers = randomNumbersNotEqual(bombCount, minRandom, maxRandom); // Generate random bomb cell numbers
      console.log(bombNumbers);

      generateGrid(bombNumbers, clearedCellsCount,  bombsHitCount, gameEnded);
    }
)

// Function to generate the grid
function generateGrid(bombCell, clearElements, elementHits, gameEnd) {

  for (let i = 1; i <= 100; i++) {
    const gameCell = createElement('div', 'bomb-cell');
    const cellNumber = createElement('span', 'cell-number');

    cellNumber.textContent = i; // Set the cell number

    // Solution to not let click function by stack overflow
    gameCell.addEventListener('click', function () {
      if (gameCell.classList.contains('clicked') || gameEnd) {
        return; // Exit if the cell has already been clicked
      }

    gameCell.classList.add('clicked'); // Mark the cell as clicked

      if (bombCell.includes(i)) {
        console.log('You hit a bomb at cell ' + cellNumber.textContent);
        gameCell.style.backgroundColor = 'red';

        elementHits++; // Increment the bombs hit count

        // Instructions after the player takes a bomb
        if (elementHits === 1) {
          console.log('Game over! You hit a bomb. You lost! High Score: ' + clearElements);
          gameEnd = true; // Set gameEnded flag to prevent further interactions with the grid
          startActualGameBtn.innerHTML = 'Play New Game';
        } 
      } else {

        console.log('You cleared cell ' + cellNumber.textContent);
        gameCell.style.backgroundColor = 'green';
        
        clearElements++; // Increment the cleared cells count

        // Instructions after the player clear all cells
        if (clearElements === 100 - bombCell.length) {
          console.log('You cleared all the cells without hitting a bomb. Congratulations!');
          gameEnd = true;
          startActualGameBtn.innerHTML = 'Play New Game';
        }        
      }

      // Update the values of clearedCellsCount and bombsHitCount
      clearedCellsCount = clearElements;
      bombsHitCount = elementHits;
      
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

