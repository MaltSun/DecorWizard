export async function generatePromptFromResults(resultsByTree: Record<string, { tag: string; weight: number }[]>) {
  const parts: string[] = [];

  for (const [tree, tags] of Object.entries(resultsByTree)) {
    const tagList = tags.map(t => t.tag.replace(/_/g, ' ')).join(', ');
    console.log(`Tags for ${tree}: ${tagList}`);
    parts.push(`${tagList}`);
  }

  const userRequest = `Создай промпт для генерации изображения красивого реалистичного торта в стиле: ${parts.join('; ')}. Торт должен быть на переднем плане, фон размытый однотонный`;

  const response = await fetch("http://localhost:5000/generate/prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request: userRequest }),
  });

  const data = await response.json();

  return data.prompt
}
