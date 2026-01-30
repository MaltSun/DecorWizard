import express from "express";
import cors from "cors";
import generationRoutes from "./routes/generationRoutes.js";
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/generate", generationRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

export default app;
