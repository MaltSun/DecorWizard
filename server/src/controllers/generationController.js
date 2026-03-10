import { generateAIPrompt } from "../services/aiService.js";
import { config } from "../config/index.js";

// export async function generateImage(req, res) {
//   try {
//     const { prompt } = req.body;

//     if (!prompt?.trim()) {
//       return res.status(400).json({ error: "Поле 'prompt' обязательно" });
//     }

//     // const imageUrl = config.POLLINATIONS_URL + encodeURIComponent(prompt.trim());

//     const imageUrl = await generateAIImage(request.trim());

//     res.json({ image: imageUrl });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// export async function generateImage(req, res) {
//   try {
//     const { prompt, width = 1024, height = 1024, model = "flux" } = req.body;

//     if (!prompt?.trim()) {
//       return res.status(400).json({ error: "Поле 'prompt' обязательно" });
//     }

//     const cleanPrompt = encodeURIComponent(prompt.trim());

//     // const imageUrl = `${config.POLLINATIONS_URL}/${encodeURIComponent(prompt.trim())}?width=${width}&height=${height}&model=${model}&nologo=true`;

//     const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

//     console.log("Attempting to fetch from:", imageUrl);

//     const response = await fetch(imageUrl);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Pollinations API error ${response.status}: ${errorText}`);
//     }

//     const imageBuffer = await response.arrayBuffer();

//     res.set("Content-Type", "image/jpeg");
//     res.send(Buffer.from(imageBuffer));
//   } catch (err) {
//     console.error("Generation error:", err);
//     res.status(500).json({ error: err.message });
//   }
// }

// export async function generateImage(req, res) {
//   try {
//     // 1. Извлекаем данные из тела запроса
//     const { prompt, width, height, model } = req.body;

//     // 2. Проверка на наличие промпта
//     if (!prompt || !prompt.trim()) {
//       return res.status(400).json({ error: "Поле 'prompt' обязательно" });
//     }

//     // 3. Устанавливаем параметры (если их нет в req.body, ставим дефолтные)
//     const imgWidth = width || 1024;
//     const imgHeight = height || 1024;
//     const imgModel = model || "flux";
//     const randomSeed = Math.floor(Math.random() * 999999);

//     // 4. Формируем URL
//     const cleanPrompt = encodeURIComponent(prompt.trim());
//     const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${imgWidth}&height=${imgHeight}&seed=${randomSeed}&model=${imgModel}&nologo=true`;

//     console.log("--- Отправка запроса ---");
//     console.log("URL:", imageUrl);

//     // 5. Запрос к Pollinations
//     const response = await fetch(imageUrl);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Pollinations API error ${response.status}: ${errorText}`,
//       );
//     }

//     // 6. Получаем бинарные данные (картинку)
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // 7. Отправляем картинку клиенту
//     res.setHeader("Content-Type", "image/jpeg");
//     return res.send(buffer);
//   } catch (err) {
//     console.error("Ошибка на сервере:", err);
//     // Важно: не отправляем ответ дважды, если заголовки уже ушли
//     if (!res.headersSent) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// }


export async function generateImage(req, res) {
  try {
    const { prompt, width, height } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Промпт пуст" });
    }

    // 1. Ограничим длину промпта (Pollinations не любит гигантские строки)
    // Возьмем первые 500 символов, если он слишком длинный
    const shortPrompt = prompt.substring(0, 500);
    const cleanPrompt = encodeURIComponent(shortPrompt);

    // 2. Используем более стабильную модель и стандартный размер
    // Убираем лишние параметры, оставляем только базу
    const randomSeed = Math.floor(Math.random() * 1000000);
    
    // Попробуй сменить модель на 'flux' или вообще не указывать её, 
    // чтобы сервис сам выбрал стабильную
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true`;

    console.log("Fetching URL:", imageUrl);

    const response = await fetch(imageUrl);

    if (!response.ok) {
      // Если сервис не отвечает, отправим клиенту понятную ошибку
      return res.status(response.status).json({ error: "Сервис генерации временно недоступен" });
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/jpeg");
    return res.send(Buffer.from(buffer));

  } catch (err) {
    console.error("Server Error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
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
