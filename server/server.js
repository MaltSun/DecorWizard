import app from "./src/app.js";
import { config } from "./src/config/index.js";

app.listen(config.PORT, () => {
  console.log(`Сервер запущен → http://localhost:${config.PORT}`);
});
