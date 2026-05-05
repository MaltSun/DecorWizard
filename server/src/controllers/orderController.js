import { prisma } from "../config/prisma.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  console.log("--- Начало createOrder ---");
  console.log("Body:", req.body);
  console.log("User:", req.user); // Проверяем, есть ли авторизация

  try {
    const { design, items } = req.body;

    if (!req.user || !req.user.id) {
        throw new Error("Пользователь не авторизован (req.user отсутствует)");
    }

    // 1. Получаем продукты
    console.log("Ищем продукты в БД...");
    const productIds = items.map((i) => i.id);
    const products = await prisma.catalog.findMany({
      where: { id: { in: productIds } },
    });
    console.log("Продукты найдены:", products.length);

    // 2. Транзакция
    console.log("Начинаем транзакцию...");
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: { userId: req.user.id, design, status: 'new' },
      });
      await tx.orderCatalog.createMany({
        data: items.map((item) => ({
          orderId: newOrder.id,
          catalogId: item.id,
          quantity: item.quantity,
          weight: item.weight || 1.5,
        })),
      });
      return newOrder;
    });
    console.log("Заказ в БД создан:", order.id);

    // 3. Stripe
    console.log("Создаем платеж в Stripe...");
    const totalAmount = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (Number(product?.price || 0) * item.quantity);
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: 'usd',
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id }
    });

    res.status(201).json({ orderId: order.id, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("!!! КРИТИЧЕСКАЯ ОШИБКА !!!", error); // ЭТО ВАЖНО
    res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
  }
};


// export const getUserOrders = async (req, res) => {
//   try {
//     const orders = await prisma.order.findMany({
//       where: { userId: req.user.id },
//       orderBy: { createdAt: 'desc' }, // Свежие сверху
//       include: {
//         orderCatalog: {
//           include: { catalog: true },
//         },
//       },
//     });

//     res.json(orders); 
//   } catch (error) {
//     res.status(500).json({ error: "Ошибка сервера" });
//   }
// };

export const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        orderCatalog: {
          include: { catalog: true },
        },
      },
    });

    // Разделяем заказы на группы
    const active = orders.filter(order => 
      order.status === 'new' || order.status === 'in_progress'
    );
    
    const history = orders.filter(order => 
      order.status === 'completed' || order.status === 'cancelled'
    );

    res.json({ active, history }); 
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const updateOrderStatus = async (req, res) => {
  if (req.user.role !== "OWNER")
    return res.status(403).json({ error: "Только владелец" });

  const { id } = req.params;
  const { status } = req.body;

  const updated = await prisma.order.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  await prisma.order.update({
    where: { id },
    data: { status: "cancelled" },
  });

  res.status(200).json({ message: "Заказ отменён" });
};
