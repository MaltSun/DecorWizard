import "dotenv/config";

export const config = {
  PORT: process.env.PORT || 5000,
  API_KEY: process.env.API_KEY_HF,
  API_KEY_IMG: process.env.API_KEY_PN,
  GEMMA_MODEL: "google/gemma-2-2b-it",
  HF_INFERENCE_URL: "https://api-inference.huggingface.co/models",
  POLLINATIONS_URL: "https://image.pollinations.ai/prompt/",
  // POLLINATIONS_URL: "https://t2i.mcpcore.xyz/api/free/generate",
  // POLLINATION_URL: "https://gen.pollinations.ai/image",
};
