import 'dotenv/config';

export const config = {
  PORT: process.env.PORT || 5000,
  API_KEY: process.env.API_KEY,
  GEMMA_MODEL: "google/gemma-2-2b-it",
  HF_INFERENCE_URL: "https://api-inference.huggingface.co/models",
  POLLINATIONS_URL: "https://image.pollinations.ai/prompt/",
};