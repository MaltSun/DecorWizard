import { config } from "../config/index.js";

export async function generateAIPrompt(userRequest) {
  if (!userRequest) throw new Error("Request is required");

  const modelId = config.GEMMA_MODEL;

  try {
    const response = await fetch(`${config.HF_INFERENCE_URL}/${modelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify({
        inputs:
          userRequest +
          "Generate a detailed, photorealistic prompt for an image generation model",
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
        },
      }),
    });

    if (response.status === 503) {
      return "Модель ещё загружается. Попробуйте через 10–60 секунд.";
    }

    if (!response.ok) {
      throw new Error(
        `Hugging Face: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    let text = data[0]?.generated_text || data?.generated_text || "";

    return text.trim() || fallbackPrompt(userRequest);
  } catch (error) {
    console.error("[aiService]", error.message);
    return fallbackPrompt(userRequest);
  }
}

function fallbackPrompt(request) {
  return `A beautiful realistic cake, ${request}, photorealistic, detailed, 8k, professional photography`;
}
