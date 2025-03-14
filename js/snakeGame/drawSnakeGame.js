let touchStartX = null; // Touch shift x
let touchStartY = null; // Touch shift y
const MIN_SWIPE_DISTANCE = 30; // Minimum swipe distance for touch controls
let isDirectionChanged = false; // Control direction changes
let bigFoodTimeout = null; // Variable para almacenar el timeout de la manzana grande

function drawApple() {
  // Draw the food
  context.fillStyle = "red"; // Color de la manzana (siempre rojo)
  context.beginPath();
  if (food.type === "normal") {
    context.arc(
      food.x * boxSize + boxSize / 2, // Centro X del círculo
      food.y * boxSize + boxSize / 2, // Centro Y del círculo
      boxSize / 3, // Radio del círculo (más pequeño)
      0, // Ángulo inicial
      Math.PI * 2 // Ángulo final (círculo completo)
    );
  } else {
    context.arc(
      food.x * boxSize + boxSize / 2, // Centro X del círculo
      food.y * boxSize + boxSize / 2, // Centro Y del círculo
      boxSize / 2, // Radio del círculo (más grande)
      0, // Ángulo inicial
      Math.PI * 2 // Ángulo final (círculo completo)
    );
  }
  context.fill();
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

  drawApple();
  

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

  // /*---------------------------------/ 
  //   / Check if the snake eats the food /
  //   /---------------------------------*/
  // if (head.x === food.x && head.y === food.y) {
  //   if (food.type === "normal") {
  //     score += 1.5;
  //   } else {
  //     score += 5;
  //   }
  //   redApples++;
  //   if (speed > 90) {
  //     speed -= 1;
  //   }
  //   food = generateFoodPosition();
  // } else {
  //   snake.pop();
  // }

  // snake.unshift(head);

    /*---------------------------------/ 
    / Check if the snake eats the food /
    /---------------------------------*/
    if (head.x === food.x && head.y === food.y) {
      if (food.type === "normal") {
        score += 1.5;
      } else {
        score += 5;
      }
      redApples++;
      if (speed > 90) {
        speed -= 1;
      }
  
      // Limpiar el timeout si la manzana grande fue comida
      if (bigFoodTimeout) {
        clearTimeout(bigFoodTimeout);
        bigFoodTimeout = null;
      }
  
      food = generateFoodPosition();
  
      // Configurar el timeout solo si la nueva manzana es grande
      if (food.type === "big") {
        bigFoodTimeout = setTimeout(() => {
          console.log("Timeout ejecutado"); // Depuración
          if (food.type === "big") { // Verificar si la manzana grande sigue en pantalla
            console.log("Generando nueva manzana..."); // Depuración
            food = generateFoodPosition(); // Generar una nueva manzana
            draw(); // Redibujar el juego para reflejar los cambios
          }
        }, 8000); // 8 segundos
      }
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

  // Allow direction changes in the next frame
  isDirectionChanged = false;
}

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
  if (isDirectionChanged) return; // Ignore if direction already changed

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
    isDirectionChanged = true; // Block further changes until the next frame
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

    if (
      Math.abs(dx) < MIN_SWIPE_DISTANCE &&
      Math.abs(dy) < MIN_SWIPE_DISTANCE
    ) {
      return; // Ignore small movements
    }

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
      isDirectionChanged = true; // Block further changes until the next frame
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
