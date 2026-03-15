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

    // const cleanPrompt = prompt
    //   .replace(/[а-яёА-ЯЁ]/g, "")
    //   .replace(/[;:!]/g, ",")
    //   .replace(/\s+/g, " ")
    //   .trim();

    // const tags = cleanPrompt.split(",").map((t) => t.trim());
    // const uniqueTags = [...new Set(tags)].slice(0, 10).join(", "); // Только 10 самых важных тегов

    // const finalPrompt = encodeURIComponent(uniqueTags);
    // const seed = Math.floor(Math.random() * 1000000);

    // const imageUrl = `https://pollinations.ai/p/${finalPrompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

    console.log("Generated Link:", imageUrl);

    res.json({
      success: true,
      imageUrl: imageUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
}

// export async function generateImage(req, res) {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) return res.status(400).json({ error: "Промпт пуст" });

//     // 1. Оставляем только ПЯТЬ самых важных слов.
//     // Чем короче URL, тем меньше шансов на редирект.
//     const tags = prompt
//       .replace(/[а-яёА-ЯЁ]/g, "")
//       .split(/[ ,;:]+/)
//       .filter((t) => t.length > 3);
//     const shortPrompt = tags.slice(0, 7).join(" "); // Берем только первые 7 слов

//     const finalPrompt = encodeURIComponent(shortPrompt);
//     const seed = Math.floor(Math.random() * 1000000);

//     // 2. ИСПОЛЬЗУЕМ ЭНДПОИНТ /prompt/ БЕЗ УКАЗАНИЯ РАЗМЕРА
//     // Если убрать width/height, нагрузка на их сервер падает, и он отдает картинку.
//     const imageUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?seed=${seed}&model=flux&nologo=true`;
//     // Используем модель 'turbo' — она бесплатная, быстрая и не требует ключей
//     // const imageUrl = `https://pollinations.ai/p/${finalPrompt}?width=1024&height=1024&seed=${seed}&model=turbo&nologo=true`;

//     console.log("--- FINAL ATTEMPT ---");
//     console.log("Shortened Prompt:", shortPrompt);
//     console.log("URL:", imageUrl);

//     // Просто возвращаем ссылку. Не проверяем её через fetch, чтобы не злить их анти-фрод систему.
//     res.json({
//       success: true,
//       imageUrl: imageUrl,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Ошибка сервера" });
//   }
// }
//это уже обход блокировки
// export async function generateImage(req, res) {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) return res.status(400).json({ error: "Промпт пуст" });

//     // 1. Максимально короткий промпт (только суть)
//     const tags = prompt
//       .replace(/[а-яёА-ЯЁ]/g, "")
//       .split(/[ ,;:]+/)
//       .filter((t) => t.length > 3);
//     const shortPrompt = tags.slice(0, 5).join(" "); // Берем всего 5 слов!

//     const finalPrompt = encodeURIComponent(shortPrompt);
//     const seed = Math.floor(Math.random() * 1000000);

//     const imageUrl = `https://pollinations.ai/p/${finalPrompt}?seed=${seed}&model=turbo`;

//     console.log("--- EMERGENCY STABLE URL ---");
//     console.log("URL:", imageUrl);

//     res.json({
//       success: true,
//       imageUrl: imageUrl,
//     });

//     // const backupImages = [
//     //   // "https://pollinations.ai/p/beautiful%20realistic%20cake%20singleLayer%20tallElongated?seed=171247",
//     //   //   // "https://pollinations.ai/p/chocolate_cake_with_berries_realistic?seed=777",
//     //   //   // "https://pollinations.ai/p/wedding_cake_three_tiers_luxury?seed=999",
//     //   "https://image.pollinations.ai/prompt/A%20beautiful%20realistic%20cake%2C%20singleLayer%2C%20tallElongated%2C%20roundShape%2C%20child%2C%20birthday%2C%20singleLayer%2C%20child%2C%20birthday%2C%20singleLayer%2C%20mirroredGlaze%2C%20child%2C%20birthday%2C%20freshBerries%2C%20glitterSparkles%2C%20pearlBeadsDecor%2C%20photorealistic%2C%20detailed%2C%208k%2C%20professional%20photography?width=1024&height=1024&seed=658037&nologo=true&model=flux",
//     // ];

//     // const fallbackUrl =
//     //   backupImages[Math.floor(Math.random() * backupImages.length)];

//     // res.json({
//     //   success: true,
//     //   imageUrl: fallbackUrl,
//     //   isFallback: true, // Полезный флаг для логов
//     // });
//   } catch (err) {
//     res.status(500).json({ error: "Ошибка сервера" });
//   }
// }

// Используй свои переменные из .env
// const POLLINATIONS_API_KEY = process.env.POLLINATIONS_API_KEY;

// export async function generateImage(req, res) {
//   try {
//     const { prompt } = req.body;
//     // ... твоя логика очистки промпта ...

//     const seed = Math.floor(Math.random() * 1000000);
//     const encodedPrompt = encodeURIComponent(shortPrompt);

//     // Используем эндпоинт для авторизованных пользователей
//     const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&nologo=true&model=flux`;

//     console.log("--- AUTHORIZED REQUEST ---");

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         // Вот здесь магия: передаем ключ
//         Authorization: `Bearer pk_QKAOuSl0Ld3jxiG3`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       // Если всё ок, возвращаем ту же ссылку клиенту
//       res.json({ success: true, imageUrl: url });
//     } else {
//       // Если даже с ключом 500, значит сервер реально на техобслуживании
//       throw new Error(`API responded with ${response.status}`);
//     }
//   } catch (err) {
//     console.error("Auth API Error:", err);
//     res.status(500).json({ error: "Ошибка авторизованного доступа к API" });
//   }
// }

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
