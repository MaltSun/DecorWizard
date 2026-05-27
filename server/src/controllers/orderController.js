import { prisma } from "../config/prisma.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createOrder = async (req, res) => {

//   try {
//     const { design, items } = req.body;

//     if (!req.user || !req.user.id) {
//         throw new Error("Пользователь не авторизован (req.user отсутствует)");
//     }

//     const productIds = items.map((i) => i.catalogId);
//     const products = await prisma.catalog.findMany({
//       where: { id: { in: productIds } },
//     });
//     const order = await prisma.$transaction(async (tx) => {
//       const newOrder = await tx.order.create({
//         data: { userId: req.user.id, design, status: 'new' },
//       });
//       await tx.orderCatalog.createMany({
//         data: items.map((item) => ({
//           orderId: newOrder.id,
//           catalogId: item.catalogId,
//           quantity: item.quantity,
//           weight: item.weight || 1.5,
//         })),
//       });
//       return newOrder;
//     });
//     console.log("Заказ в БД создан:", order.id);

//     // 3. Stripe
//     console.log("Создаем платеж в Stripe...");
//     const totalAmount = items.reduce((sum, item) => {
//       const product = products.find((p) => p.id === item.id);
//       return sum + (Number(product?.price || 0) * item.quantity);
//     }, 0);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalAmount * 100),
//       currency: 'usd',
//       metadata: { orderId: order.catalogId },
//     });

//     await prisma.order.update({
//       where: { id: order.id },
//       data: { paymentIntentId: paymentIntent.id }
//     });

//     res.status(201).json({ orderId: order.id, clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("!!! КРИТИЧЕСКАЯ ОШИБКА !!!", error); // ЭТО ВАЖНО
//     res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const { design, items } = req.body;

    if (!req.user || !req.user.id) {
      throw new Error("Пользователь не авторизован");
    }

    // 1. Получаем продукты по catalogId
    const productIds = items.map((i) => i.catalogId);
    const products = await prisma.catalog.findMany({
      where: { id: { in: productIds } },
    });

    // 2. Создаем заказ в БД
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: { userId: req.user.id, design, status: 'new' },
      });

      await tx.orderCatalog.createMany({
        data: items.map((item) => ({
          orderId: newOrder.id,
          catalogId: item.catalogId,
          quantity: item.quantity,
          weight: item.weight || 1.5,
        })),
      });
      return newOrder;
    });

    // 3. РАСЧЕТ СУММЫ (ИСПРАВЛЕНО)
    const totalAmount = items.reduce((sum, item) => {
      // Ищем продукт, сравнивая его id с catalogId из айтема
      const product = products.find((p) => p.id === item.catalogId);
      const price = Number(product?.price || 0);
      
      console.log(`Считаем: ${product?.name} | Цена: ${price} | Кол-во: ${item.quantity}`);
      
      return sum + (price * item.quantity);
    }, 0);

    console.log("ИТОГОВАЯ СУММА К ОПЛАТЕ:", totalAmount);

    if (totalAmount <= 0) {
      throw new Error("Сумма заказа не может быть нулевой. Проверьте цены в каталоге.");
    }

    // 4. Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // в центах
      currency: 'usd',
      metadata: { orderId: order.id }, // Используем ID созданного заказа
    });

    // 5. Обновляем заказ ID платежа
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id }
    });

    res.status(201).json({ 
      orderId: order.id, 
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error) {
    console.error("!!! КРИТИЧЕСКАЯ ОШИБКА !!!", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        orderCatalog: {
          include: { catalog: true },
        },
        reviews: {
          include: { answers: true }
        }
      },
    });

    const active = orders.filter(order => 
      order.status === 'new' || order.status === 'in_progress'
    );
    
    const history = orders.filter(order => 
      order.status === 'completed' || order.status === 'cancelled'
    );

    res.json({ active, history }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};


export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  await prisma.order.update({
    where: { id },
    data: { status: "cancelled" },
  });

  res.status(200).json({ message: "Заказ отменён" });
};
