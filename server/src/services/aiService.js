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
        inputs: userRequest,
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

// export async function generateAIImage(req, res) {
//   try {
//     const { prompt, width = 1024, height = 1024, model = "flux" } = req.body;

//     if (!prompt?.trim()) {
//       return res.status(400).json({ error: "Поле 'prompt' обязательно" });
//     }

//     const response = await fetch(`${config.HF_INFERENCE_URL}/${encodeURIComponent(prompt.trim())}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${config.API_KEY_IMG}`,
//       },
//       body: JSON.stringify({
//         prompt: prompt.trim(),
//         model: model,
//         width: width,
//         height: height,
//         nologo: true,
//         private: false,
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Pollinations API error: ${error}`);
//     }

//     const imageBuffer = await response.arrayBuffer();

//     res.set("Content-Type", "image/jpeg");
//     res.send(Buffer.from(imageBuffer));
//   } catch (err) {
//     console.error("Generation error:", err);
//     res.status(500).json({ error: err.message });
//   }
// }

// export async function ImageGenerationService(prompt) {
//   // Make the request
//   const response = await fetch("https://t2i.mcpcore.xyz/api/free/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       prompt: prompt,
//       model: "turbo",
//     }),
//   });

//   // Create event source for streaming updates
//   const reader = response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
//     new TransformStream({
//       transform(chunk, controller) {
//         // Parse SSE data
//         const lines = chunk.split("\n");
//         const messages = lines
//           .filter((line) => line.startsWith("data: "))
//           .map((line) => JSON.parse(line.slice(6)));

//         messages.forEach((data) => {
//           switch (data.status) {
//             case "processing":
//               console.log("Progress:", data.message);
//               break;
//             case "complete":
//               console.log("Image URL:", data.imageUrl);
//               break;
//             case "error":
//               console.error("Error:", data.message);
//               break;
//           }
//         });
//       },
//     }),
//   );

//   // Start reading the stream
//   reader.read();
// }
