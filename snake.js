// Configuración del juego
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
const canvasWidth = canvas.width / boxSize;
const canvasHeight = canvas.height / boxSize;
let snake = [{ x: 10, y: 10 }];
let food = generateFoodPosition();
let direction = "right";
let speed = 200; // Velocidad inicial (en milisegundos)
let score = 0; // Puntuación

// Variables para contar las manzanas comidas
let applesEaten = 0;
let goldenApplesEaten = 0;
let totalAples = 0;

// Tiempo de la manzana azul
let goldenAppleTimer = 0;
const goldenAppleDuration = 5000; // 5 segundos en milisegundos

// Arreglo que almacena los obstaculos
let obstacles = [];

// Elemento HTML para mostrar el recuento de manzanas comidas
const applesEatenElement = document.getElementById("applesEaten");

// Referencia al intervalo del juego
let gameInterval;

function generateObstacle() {
    const obstaclePosition = {
        x: Math.floor(Math.random() * canvasWidth),
        y: Math.floor(Math.random() * canvasHeight),
    };
    obstacles.push(obstaclePosition);
}


// Función para generar una posición aleatoria para la comida
function generateFoodPosition() {
    let newFoodPosition;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * canvasWidth),
            y: Math.floor(Math.random() * canvasHeight),
        };
    } while (checkCollision(newFoodPosition));

    if (Math.random() < 0.9) {
        newFoodPosition.type = "red"; // Manzana roja
    } else {
        newFoodPosition.type = "gold"; // Manzana azul
        goldenAppleTimer = goldenAppleDuration; // Inicia el temporizador de la manzana azul
    }
    return newFoodPosition;
}


// Función para dibujar elementos en el lienzo
function draw() {
    // Dibuja el fondo
    for (let y = 0; y < canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
            // Alterna los colores de fondo en cada cuadrado
            if ((x + y) % 2 === 0) {
                context.fillStyle = "lightgreen";
            } else {
                context.fillStyle = "#D0E6AF";
            }

            context.fillRect(
                x * boxSize,
                y * boxSize,
                boxSize,
                boxSize
            );
        }
    }


    // Dibuja la serpiente
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];

        // Dibuja el cuerpo de la serpiente con el color azul y borde de contraste
        context.fillStyle = "blue";
        context.fillRect(
            segment.x * boxSize + 1,
            segment.y * boxSize + 1,
            boxSize - 2,
            boxSize - 2
        );

        // Dibuja el borde de la serpiente con un color de contraste
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.strokeRect(
            segment.x * boxSize,
            segment.y * boxSize,
            boxSize,
            boxSize
        );

        // Dibuja los ojos en la cabeza de la serpiente
        if (i === 0) {
            const headX = segment.x * boxSize;
            const headY = segment.y * boxSize;
            const eyeSize = boxSize / 5;

            // Dibuja el ojo izquierdo
            context.fillStyle = "white";
            context.fillRect(headX + eyeSize, headY + eyeSize, eyeSize, eyeSize);

            // Dibuja el ojo derecho
            context.fillRect(
                headX + (boxSize - 2 * eyeSize),
                headY + eyeSize,
                eyeSize,
                eyeSize
            );
        }
    }

    // Dibuja la comida
    if (food.type === "red") {
        context.fillStyle = "red"; // Color para la manzana roja
        context.beginPath();
        context.arc(
            food.x * boxSize + boxSize / 2, // Centro X del círculo
            food.y * boxSize + boxSize / 2, // Centro Y del círculo
            boxSize / 3, // Radio del círculo
            0, // Ángulo inicial
            Math.PI * 2 // Ángulo final (círculo completo)
        );
        context.fill();
    } else if (food.type === "gold") {
        context.fillStyle = "orange"; // Color para la manzana azul
        context.beginPath();
        context.arc(
            food.x * boxSize + boxSize / 2,
            food.y * boxSize + boxSize / 2,
            boxSize / 3,
            0,
            Math.PI * 2
        );
        context.fill();
    }

    // Genera un obstáculo aleatoriamente
    if (Math.random() < 0.02) {
        generateObstacle();
    }

    // Mueve la serpiente
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

    // Dibuja los obstáculos
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        context.fillStyle = "gray";
        context.fillRect(
            obstacle.x * boxSize + 1,
            obstacle.y * boxSize + 1,
            boxSize - 2,
            boxSize - 2
        );
    }

    // Verifica si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
        if (food.type === "red") {
            score += 1.5 + goldenApplesEaten * 6;
            applesEaten++;
        } else if (food.type === "blue") {
            score = score * 1.5;
            goldenApplesEaten++;
        }
        food = generateFoodPosition();

        if ((applesEaten + goldenApplesEaten) % 3 === 0) {
            speed -= 3;
        }
    } else {
        snake.pop();
    }

    // Actualiza el temporizador de la manzana azul
    if (food.type === "blue") {
        goldenAppleTimer -= speed;
        if (goldenAppleTimer <= 0) {
            food = generateFoodPosition();
            goldenAppleTimer = goldenAppleDuration;
        }
    }

    snake.unshift(head);

    // Verifica si la serpiente choca consigo misma
    if (checkCollision(head) || checkCollisionWithObstacles(head)) {
        clearInterval(gameInterval);
        showGameOver();
        return;
    }

    // Actualiza el recuento de manzanas comidas
    totalAples = goldenApplesEaten + applesEaten;
    applesEatenElement.textContent = `Manzanas: ${totalAples}`;

    // Actualiza la velocidad del bucle principal del juego
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, speed);

    // Muestra la puntuación fuera del mapa
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Puntuación: ${Math.floor(score)}`;
}

// Función para verificar colisiones con el cuerpo de la serpiente
function checkCollision(position) {
    for (let i = 1; i < snake.length; i++) {
        if (position.x === snake[i].x && position.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkCollisionWithObstacles(position) {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (position.x === obstacle.x && position.y === obstacle.y) {
            return true;
        }
    }
    return false;
}

// Manejador de eventos para cambiar la dirección de la serpiente
document.addEventListener("keydown", (event) => {
    if (
        (event.key === "ArrowLeft" || event.key === "a") &&
        direction !== "right"
    ) {
        direction = "left";
    } else if (
        (event.key === "ArrowUp" || event.key === "w") &&
        direction !== "down"
    ) {
        direction = "up";
    } else if (
        (event.key === "ArrowRight" || event.key === "d") &&
        direction !== "left"
    ) {
        direction = "right";
    } else if (
        (event.key === "ArrowDown" || event.key === "s") &&
        direction !== "up"
    ) {
        direction = "down";
    }
});

// Bucle principal del juego
gameInterval = setInterval(draw, speed);

// Función para reiniciar el juego
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFoodPosition();
    direction = "right";
    speed = 200;
    score = 0;
    applesEaten = 0; // Reinicia el contador de manzanas rojas
    goldenApplesEaten = 0; // Reinicia el contador de manzanas azules
    obstacles = [];
    applesEatenElement.textContent = `Manzanas rojas: ${applesEaten} | Manzanas azules: ${goldenApplesEaten}`;
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Puntuación: ${Math.floor(score)}`;

    // Oculta el botón de reinicio si existe
    const restartButton = document.getElementById("restartButton");
    if (restartButton) {
        restartButton.remove();
    }
}

// Función para mostrar el mensaje de Game Over
function showGameOver() {
    const scoreMessage = `Puntuación: ${Math.floor(score)}`;
    const applesEatenMessage = `Manzanas comidas: ${applesEaten}`;
    const gameOverMessage = `Game Over\n${scoreMessage}\n${applesEatenMessage}`;

    // Crea el botón de reinicio
    const restartButton = document.createElement("button");
    restartButton.textContent = "Reiniciar";
    restartButton.id = "restartButton";
    restartButton.style.position = "absolute";
    restartButton.style.left = "50%";
    restartButton.style.top = "50%";
    restartButton.style.transform = "translate(-50%, -50%)";
    restartButton.style.padding = "10px 20px";
    restartButton.style.fontSize = "16px";
    restartButton.style.backgroundColor = "red";
    restartButton.style.border = "none";
    restartButton.style.color = "white";
    restartButton.style.fontFamily = "'VT323', monospace";
    restartButton.style.cursor = "pointer";

    // Agrega el evento de clic al botón de reinicio
    restartButton.addEventListener("click", () => {
        clearInterval(gameInterval);
        resetGame();
        gameInterval = setInterval(draw, speed);
    });

    // Muestra el mensaje de Game Over y el botón de reinicio en un cuadro de diálogo
    alert(gameOverMessage);
    document.body.appendChild(restartButton);
}
