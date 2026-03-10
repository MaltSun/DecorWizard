import { generateAIPrompt } from "../services/aiService.js";
import { config } from "../config/index.js";



export async function generateImage(req, res) {
  try {
    const { prompt } = req.body;


    const cleanPrompt = prompt
      .replace(/[а-яёА-ЯЁ]/g, "") 
      .replace(/\d{10,}/g, "")    
      .replace(/[;:!]/g, ",")     
      .replace(/\s+/g, " ")       
      .trim();

    const finalPrompt = encodeURIComponent(cleanPrompt || "beautiful cake");
    const seed = Math.floor(Math.random() * 1000000);

 
    const imageUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    console.log("Generated Link:", imageUrl);

    res.json({ 
      success: true, 
      imageUrl: imageUrl 
    });

  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
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
