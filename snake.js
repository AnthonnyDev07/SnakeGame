/* Variables */
const canvas = document.getElementById("gameCanvas"); // Get canvas element
const context = canvas.getContext("2d"); // Get 2D drawing context
const boxSize = 20; // Size of each grid cell
const canvasWidth = canvas.width / boxSize; // Grid width in cells
const canvasHeight = canvas.height / boxSize; // Grid height in cells
let snake = [{ x: 10, y: 10 }]; // Snake starting position
let food = generateFoodPosition(); // Random food position
let direction = "right"; // Initial movement direction
let speed = 200; // Snake movement speed (ms)
let score = 0; // Player score
let redApples = 0; // Total red apples
let goldenApples = 0; // Total golden apples
let obstacles = []; // Array that stores the obstacles
let touchStartX = null; // Touch shift x
let touchStartY = null; // Touch shift y
// HTML element to display the count of apples eaten
const applesEatenElement = document.getElementById("applesEaten");
let gameInterval; // Reference to the game interval

/*------------------------------------
Function to generate a random position
for the food
-------------------------------------*/
function generateFoodPosition() {
  let newFoodPosition;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * canvasWidth),
      y: Math.floor(Math.random() * canvasHeight),
    };
  } while (checkCollision(newFoodPosition));
  newFoodPosition.type = "red";
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

/*--------------------------------------
Function to drive elements on the canvas
---------------------------------------*/
function draw() {
  // Draw the background
  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      // Alternate background color in each square
      if ((x + y) % 2 === 0) {
        context.fillStyle = "lightgreen";
      } else {
        context.fillStyle = "#D0E6AF";
      }
      context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    }
  }

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];
    context.fillStyle = "blue";
    context.fillRect(
      segment.x * boxSize + 0.5,
      segment.y * boxSize + 0.5,
      boxSize - 2,
      boxSize - 2
    );
    // Draw the edge of snake
    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.strokeRect(
      segment.x * boxSize,
      segment.y * boxSize,
      boxSize,
      boxSize
    );
    // Draw the eyes on the snake's head
    if (i === 0) {
      const headX = segment.x * boxSize;
      const headY = segment.y * boxSize;
      const eyeSize = boxSize / 5;
      // Draw the left eye
      context.fillStyle = "white";
      context.fillRect(headX + eyeSize, headY + eyeSize, eyeSize, eyeSize);
      // Draw the right eye
      context.fillRect(
        headX + (boxSize - 2 * eyeSize),
        headY + eyeSize,
        eyeSize,
        eyeSize
      );
    }
  }

  // Drow the food
  if (food.type === "red") {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(
      food.x * boxSize + boxSize / 2, // Center X of the circle
      food.y * boxSize + boxSize / 2, // Center Y of the circle
      boxSize / 3, // Radius of the circle
      0, // Initial angle
      Math.PI * 2 // Final angle (full circle)
    );
    context.fill();
  }

  // Move the snake with arrows
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") {
    head.x++;
    if (head.x >= canvasWidth) {
      head.x = 0;
    }
  } else if (direction === "left") {
    head.x--;
    if (head.x < 0) {
      head.x = canvasWidth - 1;
    }
  } else if (direction === "up") {
    head.y--;
    if (head.y < 0) {
      head.y = canvasHeight - 1;
    }
  } else if (direction === "down") {
    head.y++;
    if (head.y >= canvasHeight) {
      head.y = 0;
    }
  }

  /*---------------------------------/ 
  / Check if the snake eats the food /
  /---------------------------------*/
  if (head.x === food.x && head.y === food.y) {
    score += 1.5;
    redApples++;
    if (speed > 75) {
      speed -= 1;
    }
    food = generateFoodPosition();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Check if the snake collides with itself
  if (checkCollision(head)) {
    clearInterval(gameInterval);
    showGameOver();
    return;
  }

  // Updates the count of apples eaten
  totalAples = redApples;
  applesEatenElement.textContent = `Manzanas: ${totalAples}`;

  // Updates the speed of the main game loop
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, speed);

  // Shows the score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Puntuación: ${Math.floor(score)}`;
}

/*---------------------------------/
/ Move the snake with the keyboard /
/---------------------------------*/
// document.addEventListener("keydown", (event) => {
//   if (
//     (event.key === "ArrowLeft" || event.key === "a") &&
//     direction !== "right"
//   ) {
//     direction = "left";
//   } else if (
//     (event.key === "ArrowUp" || event.key === "w") &&
//     direction !== "down"
//   ) {
//     direction = "up";
//   } else if (
//     (event.key === "ArrowRight" || event.key === "d") &&
//     direction !== "left"
//   ) {
//     direction = "right";
//   } else if (
//     (event.key === "ArrowDown" || event.key === "s") &&
//     direction !== "up"
//   ) {
//     direction = "down";
//   }
// });

//   /*----------------------------------- 
//   Move the snake with the touch screen 
//   -------------------------------------*/
//   canvas.addEventListener(
//     "touchstart",
//     function (event) {
//       touchStartX = event.touches[0].clientX;
//       touchStartY = event.touches[0].clientY;
//     },
//     false
//   );
//   // Event for when the user moves his finger on the screen
//   canvas.addEventListener(
//     "touchmove",
//     function (event) {
//       if (touchStartX === null || touchStartY === null) {
//         return;
//       }

//       let touchEndX = event.touches[0].clientX;
//       let touchEndY = event.touches[0].clientY;

//       let dx = touchEndX - touchStartX;
//       let dy = touchEndY - touchStartY;

//       if (Math.abs(dx) > Math.abs(dy)) {
//         // Horizontal movement
//         if (dx > 0) {
//           direction = "right";
//         } else {
//           direction = "left";
//         }
//       } else {
//         // Vertical movement
//         if (dy > 0) {
//           direction = "down";
//         } else {
//           direction = "up";
//         }
//       }

//       // Reset initial coordinates for next move
//       touchStartX = null;
//       touchStartY = null;

//       // Prevent page scrolling
//       event.preventDefault();
//     },
//     false
//   );

// Función para verificar si la dirección es válida
function isValidDirection(newDirection) {
  // Si la serpiente tiene un solo segmento (solo la cabeza), cualquier dirección es válida
  if (snake.length === 1) {
    return true;
  }

  // Verificar si la nueva dirección es opuesta a la dirección actual
  if (
    (direction === "right" && newDirection === "left") ||
    (direction === "left" && newDirection === "right") ||
    (direction === "up" && newDirection === "down") ||
    (direction === "down" && newDirection === "up")
  ) {
    return false; // Dirección no válida
  }

  return true; // Dirección válida
}

/*---------------------------------/
/ Move the snake with the keyboard /
/---------------------------------*/
document.addEventListener("keydown", (event) => {
  let newDirection = direction;

  if (event.key === "ArrowLeft" || event.key === "a") {
    newDirection = "left";
  } else if (event.key === "ArrowUp" || event.key === "w") {
    newDirection = "up";
  } else if (event.key === "ArrowRight" || event.key === "d") {
    newDirection = "right";
  } else if (event.key === "ArrowDown" || event.key === "s") {
    newDirection = "down";
  }

  // Cambiar la dirección solo si es válida
  if (isValidDirection(newDirection)) {
    direction = newDirection;
  }
});

/*----------------------------------- 
  Move the snake with the touch screen 
  -------------------------------------*/
canvas.addEventListener(
  "touchstart",
  function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  },
  false
);

canvas.addEventListener(
  "touchmove",
  function (event) {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;

    let newDirection = direction;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal movement
      if (dx > 0) {
        newDirection = "right";
      } else {
        newDirection = "left";
      }
    } else {
      // Vertical movement
      if (dy > 0) {
        newDirection = "down";
      } else {
        newDirection = "up";
      }
    }

    // Cambiar la dirección solo si es válida
    if (isValidDirection(newDirection)) {
      direction = newDirection;
    }

    // Reset initial coordinates for next move
    touchStartX = null;
    touchStartY = null;

    // Prevent page scrolling
    event.preventDefault();
  },
  false
);

// Bucle principal del juego
gameInterval = setInterval(draw, speed);

// Function to restart the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  food = generateFoodPosition();
  direction = "right";
  speed = 200;
  score = 0;
  redApples = 0
  //goldenApples = 0;
  obstacles = [];
  // applesEatenElement.textContent = `Manzanas rojas: ${redApples} | Manzanas azules: ${goldenApples}`;
  applesEatenElement.textContent = `Manzanas rojas: ${redApples}`;
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Puntuación: ${Math.floor(score)}`;
}

function showGameOver() {
  const scoreMessage = `Puntuación: ${Math.floor(score)}`;
  const applesEatenMessage = `Manzanas comidas: ${redApples}`;
  const gameOverMessage = `Game Over\n${scoreMessage}\n${applesEatenMessage}`;

  // Create a container for the Game Over message and button
  const gameOverBox = document.createElement("div");
  gameOverBox.id = "gameOverBox";
  gameOverBox.style.position = "absolute";
  gameOverBox.style.left = "50%";
  gameOverBox.style.top = "50%";
  gameOverBox.style.transform = "translate(-50%, -50%)";
  gameOverBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  gameOverBox.style.color = "white";
  gameOverBox.style.padding = "20px";
  gameOverBox.style.borderRadius = "10px";
  gameOverBox.style.textAlign = "center";
  gameOverBox.style.fontFamily = "'VT323', monospace";
  gameOverBox.style.zIndex = "1000";

  // Add the Game Over message
  const message = document.createElement("p");
  message.textContent = gameOverMessage;
  message.style.fontSize = "24px";
  message.style.margin = "0 0 20px 0";
  gameOverBox.appendChild(message);

  // Create the restart button
  const restartButton = document.createElement("button");
  restartButton.textContent = "Reiniciar";
  restartButton.style.padding = "10px 20px";
  restartButton.style.fontSize = "20px";
  restartButton.style.backgroundColor = "red";
  restartButton.style.border = "none";
  restartButton.style.color = "white";
  restartButton.style.cursor = "pointer";
  restartButton.style.borderRadius = "5px";
  restartButton.style.fontFamily = "'VT323', monospace";

  // Add the click event to the restart button
  restartButton.addEventListener("click", () => {
    clearInterval(gameInterval);
    resetGame();
    gameInterval = setInterval(draw, speed);
    document.body.removeChild(gameOverBox); // Remove the Game Over box
  });

  // Add the button to the Game Over box
  gameOverBox.appendChild(restartButton);

  // Add the Game Over box to the body
  document.body.appendChild(gameOverBox);
}
