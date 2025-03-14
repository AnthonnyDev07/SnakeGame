/* Variables */
const canvas = document.getElementById("gameCanvas"); // Get canvas element
const context = canvas.getContext("2d"); // Get 2D drawing context
const boxSize = 20; // Size of each grid cell
const canvasWidth = canvas.width / boxSize; // Grid width in cells
const canvasHeight = canvas.height / boxSize; // Grid height in cells
let snake = [{ x: 10, y: 10 }]; // Snake starting position
let food = generateFoodPosition(); // Random food position
//let bigFoodTimeout = null; // Timeout for big food disappearance
let direction = "right"; // Initial movement direction
let speed = 200; // Snake movement speed (ms)
let score = 0; // Player score
let redApples = 0; // Total red apples
// HTML element to display the count of apples eaten
const applesEatenElement = document.getElementById("applesEaten");
let gameInterval; // Reference to the game interval

/*------------------------------------
Function to generate a random position
for the food 
-------------------------------------*/
function generateFoodPosition() {
  let newFoodPosition;
  let isPositionValid;

  do {
    // Generar una posición aleatoria
    newFoodPosition = {
      x: Math.floor(Math.random() * canvasWidth),
      y: Math.floor(Math.random() * canvasHeight),
    };

    // Verificar si la posición está ocupada por la serpiente
    isPositionValid = true; // Asumir que la posición es válida inicialmente
    for (const segment of snake) {
      if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
        isPositionValid = false; // La posición está ocupada
        break;
      }
    }
  } while (!isPositionValid); // Repetir hasta encontrar una posición válida

  // let tipe = "";
  let randomValue = Math.floor(Math.random() * 11); // Número entre 0 y 10

  if (randomValue === 0 ) {
    // isBigFood = false;
    newFoodPosition.type = "big";
  } else {
    // isBigFood = true;
    newFoodPosition. type = "normal";
  }

  return newFoodPosition;
}

/*------------------------------------------------------|
|Function to check for collisions with the snake's body |
|------------------------------------------------------*/
function checkCollision(position) {
  for (let i = 1; i < snake.length; i++) {
    if (position.x === snake[i].x && position.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Function to restart the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = generateFoodPosition();
  direction = "right";
  speed = 200;
  score = 0;
  redApples = 0;
  obstacles = [];
  applesEatenElement.textContent = `Manzanas rojas: ${redApples}`;
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Puntuación: ${Math.floor(score)}`;
}
