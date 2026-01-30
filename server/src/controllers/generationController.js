import { generateAIPrompt } from '../services/aiService.js';
import { config } from '../config/index.js';

export async function generateImage(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
      return res.status(400).json({ error: "Поле 'prompt' обязательно" });
    }

    const imageUrl = config.POLLINATIONS_URL + encodeURIComponent(prompt.trim());

    res.json({ image: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
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