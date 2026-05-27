// import "dotenv/config";
import * as dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import { config } from "./src/config/index.js";

if (!process.env.JWT_SECRET) {
  console.error(" ВНИМАНИЕ: JWT_SECRET не установлен в переменных окружения!");
  console.error("   Убедитесь, что файл .env существует и содержит JWT_SECRET");
}

app.listen(config.PORT, () => {
  console.log(`Сервер запущен → http://localhost:${config.PORT}`);
  console.log(
    `JWT_SECRET: ${process.env.JWT_SECRET ? "установлен" : " отсутствует"}`,
  );
});
