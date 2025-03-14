
async function saveScore(name, score) {
    const { data, error } = await supabasePublicClient.rpc('insert_score', {
        name: name,
        score: score
    });
  
    if (error) {
        console.error("Error saving score:", error);
        return null;
    }
  
    console.log("Score saved successfully:", data);
    return data;
  }