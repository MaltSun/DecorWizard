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

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
       orderBy: {
        createdAt: "desc",
      },
      include: {
        order: {
          select: {
            createdAt: true,
            user: {
              select: {
                name: true, 
              },
            },
          },
        },
        answers: true,
      },
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      mark: review.mark,
      text: review.text,
      createdAt: review.createdAt,
      customerName: review.order?.user?.name || "Аноним",
      orderDate: review.order?.createdAt,
      answer: review.answers.length > 0 ? review.answers[0] : null,
    }));

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    res.status(500).json({ error: "Не удалось загрузить отзывы" });
  }
};
