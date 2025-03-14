function showGameOver() {
  const scoreMessage = `Puntuación: ${Math.floor(score)}`;
  const applesEatenMessage = `Manzanas: ${redApples}`;
  const gameOverMessage = `Game Over\n${scoreMessage}\n${applesEatenMessage}`;

  // Crear un contenedor para el mensaje de Game Over y los botones
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

  // Agregar el mensaje de Game Over
  const message = document.createElement("p");
  message.innerHTML = gameOverMessage.replace(/\n/g, "<br>"); // Reemplazar \n con <br>
  message.style.fontSize = "24px";
  message.style.margin = "0 0 20px 0";
  gameOverBox.appendChild(message);

  // Crear el botón de reinicio
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

  // Agregar el evento de clic al botón de reinicio
  restartButton.addEventListener("click", () => {
    clearInterval(gameInterval);
    resetGame();
    gameInterval = setInterval(draw, speed);
    document.body.removeChild(gameOverBox); // Eliminar el cuadro de Game Over
  });

  // Crear el botón de guardar puntuación
  const saveScoreButton = document.createElement("button");
  saveScoreButton.textContent = "Guardar Puntuación";
  saveScoreButton.style.padding = "10px 20px";
  saveScoreButton.style.fontSize = "20px";
  saveScoreButton.style.backgroundColor = "red";
  saveScoreButton.style.border = "none";
  saveScoreButton.style.color = "white";
  saveScoreButton.style.cursor = "pointer";
  saveScoreButton.style.borderRadius = "5px";
  saveScoreButton.style.fontFamily = "'VT323', monospace";
  saveScoreButton.style.marginLeft = "10px"; // Espacio entre los botones

  saveScoreButton.addEventListener("click", () => {
    showSaveScore();
  });

  // Crear el botón de salir
  const exitButton = document.createElement("button");
  exitButton.textContent = "Salir";
  exitButton.style.padding = "10px 20px";
  exitButton.style.fontSize = "20px";
  exitButton.style.backgroundColor = "red";
  exitButton.style.border = "none";
  exitButton.style.color = "white";
  exitButton.style.cursor = "pointer";
  exitButton.style.borderRadius = "5px";
  exitButton.style.fontFamily = "'VT323', monospace";
  exitButton.style.marginLeft = "10px"; // Espacio entre los botones

  // Agregar el evento de clic al botón de salir
  exitButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirigir al index.html
  });

  // // Crear un input para el nombre del jugador
  // const nameInput = document.createElement("input");
  // nameInput.type = "text";
  // nameInput.placeholder = "Escribe tu nombre";
  // nameInput.style.padding = "10px";
  // nameInput.style.fontSize = "16px";
  // nameInput.style.marginTop = "10px";
  // nameInput.style.borderRadius = "5px";
  // nameInput.style.border = "2px solid #0f0";
  // nameInput.style.backgroundColor = "#111";
  // nameInput.style.color = "#0f0";
  // nameInput.style.fontFamily = "'VT323', monospace";
  // nameInput.style.display = "none"; // Ocultar el input inicialmente

  // // Agregar el evento de clic al botón de guardar puntuación
  // saveScoreButton.addEventListener("click", () => {
  //     if (nameInput.style.display === "none") {
  //         // Mostrar el input si está oculto
  //         nameInput.style.display = "block";
  //         saveScoreButton.textContent = "Guardar";
  //     } else {
  //         // Guardar la puntuación si el input está visible
  //         const playerName = nameInput.value.trim();
  //         if (playerName) {
  //             saveScore(playerName, Math.floor(score))
  //                 .then(() => {
  //                     // Mostrar un nuevo cuadro de Game Over después de guardar
  //                     document.body.removeChild(gameOverBox); // Eliminar el cuadro actual
  //                     showGameOverAfterSave(); // Mostrar el nuevo cuadro
  //                 })
  //                 .catch((error) => {
  //                     console.error("Error al guardar la puntuación:", error);
  //                     alert("Hubo un error al guardar la puntuación.");
  //                 });
  //         } else {
  //             alert("Por favor, escribe tu nombre.");
  //         }
  //     }
  // });

  // Agregar los elementos al cuadro de Game Over
  gameOverBox.appendChild(restartButton);
  gameOverBox.appendChild(saveScoreButton);
  gameOverBox.appendChild(exitButton);
  // gameOverBox.appendChild(nameInput);

  // Agregar el cuadro de Game Over al body
  document.body.appendChild(gameOverBox);
}

function showSaveScore() {
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
  gameOverBox.style.display = "block";
  gameOverBox.style.flexDirection = "colum";

  // Mensaje de éxito
  const message = document.createElement("p");
  message.textContent = "Puntuación guardada correctamente.";
  message.style.fontSize = "24px";
  message.style.margin = "0 0 20px 0";
  gameOverBox.appendChild(message);

    // Crear el botón de guardar puntuación
    const saveScoreButton = document.createElement("button");
    saveScoreButton.textContent = "Guardar Puntuación";
    saveScoreButton.style.padding = "10px 20px";
    saveScoreButton.style.fontSize = "20px";
    saveScoreButton.style.backgroundColor = "red";
    saveScoreButton.style.border = "none";
    saveScoreButton.style.color = "white";
    saveScoreButton.style.cursor = "pointer";
    saveScoreButton.style.borderRadius = "5px";
    saveScoreButton.style.fontFamily = "'VT323', monospace";
    saveScoreButton.style.marginLeft = "10px"; // Espacio entre los botones

  // Crear un input para el nombre del jugador
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Escribe tu nombre";
  nameInput.style.padding = "10px";
  nameInput.style.fontSize = "16px";
  nameInput.style.marginTop = "10px";
  nameInput.style.borderRadius = "5px";
  nameInput.style.border = "2px solid #0f0";
  nameInput.style.backgroundColor = "#111";
  nameInput.style.width = "90%";
  nameInput.style.color = "#0f0";
  nameInput.style.fontFamily = "'VT323', monospace";
  nameInput.style.display = "block"; // Ocultar el input inicialmente

  // Agregar el evento de clic al botón de guardar puntuación
  saveScoreButton.addEventListener("click", () => {
    const playerName = nameInput.value.trim();
    if (playerName) {
      saveScore(playerName, Math.floor(score))
        .then(() => {
          // Mostrar un nuevo cuadro de Game Over después de guardar
          document.body.removeChild(gameOverBox); // Eliminar el cuadro actual
          showGameOverAfterSave(); // Mostrar el nuevo cuadro
        })
        .catch((error) => {
          console.error("Error al guardar la puntuación:", error);
          alert("Hubo un error al guardar la puntuación.");
        });
      {
        alert("Por favor, escribe tu nombre.");
      }
    }
  });

    // Agregar el cuadro de Game Over al body
    gameOverBox.appendChild(saveScoreButton);
    gameOverBox.appendChild(nameInput);
    document.body.appendChild(gameOverBox);
}

// Función para mostrar el cuadro de Game Over después de guardar la puntuación
function showGameOverAfterSave() {
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

  // Mensaje de éxito
  const message = document.createElement("p");
  message.textContent = "Puntuación guardada correctamente.";
  message.style.fontSize = "24px";
  message.style.margin = "0 0 20px 0";
  gameOverBox.appendChild(message);

  // Crear el botón de reinicio
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

  // Agregar el evento de clic al botón de reinicio
  restartButton.addEventListener("click", () => {
    clearInterval(gameInterval);
    resetGame();
    gameInterval = setInterval(draw, speed);
    document.body.removeChild(gameOverBox); // Eliminar el cuadro de Game Over
  });

  // Crear el botón de salir
  const exitButton = document.createElement("button");
  exitButton.textContent = "Salir";
  exitButton.style.padding = "10px 20px";
  exitButton.style.fontSize = "20px";
  exitButton.style.backgroundColor = "red";
  exitButton.style.border = "none";
  exitButton.style.color = "white";
  exitButton.style.cursor = "pointer";
  exitButton.style.borderRadius = "5px";
  exitButton.style.fontFamily = "'VT323', monospace";
  exitButton.style.marginLeft = "10px"; // Espacio entre los botones

  // Agregar el evento de clic al botón de salir
  exitButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirigir al index.html
  });

  // Agregar los botones al cuadro de Game Over
  gameOverBox.appendChild(restartButton);
  gameOverBox.appendChild(exitButton);

  // Agregar el cuadro de Game Over al body
  document.body.appendChild(gameOverBox);
}
