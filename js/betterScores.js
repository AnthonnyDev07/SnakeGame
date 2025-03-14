
(async () => {
    // Obtener los datos de la tabla "scores"
    const response = await supabasePublicClient
    .from("scores")
    .select("*")
    .order("score", { ascending: false }) // Ordenar por score en orden descendente
    .limit(5); // Limitar a 5 resultados

    if (response.error) {
        console.error("Error fetching scores:", response.error);
        return;
    }

    // Mostrar los datos en la tabla
    const scoresTableBody = document.querySelector("#scores-table tbody");
    scoresTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    response.data.forEach(score => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = score.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = score.score;

        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        scoresTableBody.appendChild(row);
    });
})();