import { config } from "../config/index.js";

export const createReview = async (req, res) => {
  const { orderId, mark, text } = req.body;
  const userId = req.user.id;

  // Проверяем, что заказ принадлежит пользователю и завершён
  const order = await config.order.findUnique({
    where: { id: orderId },
  });

  if (!order || order.userId !== userId || order.status !== "completed") {
    return res.status(403).json({ error: "Нельзя оставить отзыв" });
  }

  const review = await config.review.create({
    data: { orderId, mark, text },
  });

  res.status(201).json(review);
};

export const createAnswer = async (req, res) => {
  if (req.user.role !== "OWNER")
    return res.status(403).json({ error: "Только владелец" });

  const { reviewId, text } = req.body;

  const answer = await config.answer.create({
    data: { reviewId, text },
  });

  res.status(201).json(answer);
};
