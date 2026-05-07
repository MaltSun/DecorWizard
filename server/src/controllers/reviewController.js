import { prisma } from "../config/prisma.js";

export const createReview = async (req, res) => {
  try {
    const { orderId, mark, text } = req.body;

    if (!orderId || mark === undefined) {
      return res.status(400).json({ error: "Недостаточно данных для отзыва" });
    }

    const formattedMark = parseInt(mark, 10); 
    const cleanOrderId = String(orderId).trim();

    const review = await prisma.review.create({
      data: {
        mark: formattedMark,
        text: text || "",
        order: {
          connect: { id: cleanOrderId },
        },
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка на бэкенде",
      message: error.message,
      stack: error.stack, 
    });
  }
};

export const createAnswer = async (req, res) => {
  if (req.user.role !== "OWNER")
    return res.status(403).json({ error: "Только владелец" });

  const { reviewId, text } = req.body;

  const answer = await prisma.answer.create({
    data: { reviewId, text },
  });

  res.status(201).json(answer);
};
