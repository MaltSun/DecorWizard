import { generateAIPrompt } from "../services/aiService.js";

export async function generateImage(req, res) {
  const { prompt } = req.body;

  if (!prompt?.trim())
    return res.status(400).json({ error: "Prompt required" });

  try {
    const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      },
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Cloudflare API error" });
    }

    // ВАЖНО: Flux на Cloudflare возвращает JSON с полем "image" в base64,
    // либо чистый бинарный поток в зависимости от заголовков.
    // Если пришел JSON (как в вашем случае):
    const data = await response.json();

    if (data.result && data.result.image) {
      // Отправляем клиенту чистый data-url
      const imageUrl = `data:image/jpeg;base64,${data.result.image}`;
      return res.json({ imageUrl });
    }

    res.status(500).json({ error: "No image in response" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
}

export async function generatePrompt(req, res) {
  try {
    const { request } = req.body;

    if (!request?.trim()) {
      return res.status(400).json({ error: "Поле 'request' обязательно" });
    }

    const prompt = await generateAIPrompt(request.trim());

    res.json({ prompt });
  } catch (err) {
    console.error("[generatePrompt]", err);
    res.status(500).json({ error: err.message });
  }
}
