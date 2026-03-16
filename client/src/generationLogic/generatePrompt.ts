export async function generatePromptFromResults(
  resultsByTree: Record<string, { tag: string; weight: number }[]>
) {
  const parts: string[] = [];

  for (const [tree, tags] of Object.entries(resultsByTree)) {
    const tagList = tags.map(t => t.tag.replace(/_/g, ' ')).join(', ');
    console.log(`Tags for ${tree}: ${tagList}`);
    parts.push(`${tagList}`);
  }

  const userRequest = `${parts.join('; ')}`;
  try {
    const response = await fetch('http://localhost:5000/api/generate/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: userRequest }),
    });
    const data = await response.json();
    console.log('Generated Prompt from Server:', data.prompt);
    return data.prompt;
  } catch (e) {
    console.error('Failed to generate prompt:', e);
    return `beautiful cake, photorealistic, detailed, 8k, professional photography ${userRequest}`;
  }
}
