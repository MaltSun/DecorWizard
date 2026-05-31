import Stripe from "stripe";
import prisma from "../config/prisma.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export const createStripePaymentIntent = async (req: any, res: any) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe key is missing on server" });
  }

  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);

    res.status(500).json({
      error: "Failed to create payment intent",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

export const verifyPayment = async (req: any, res: any) => {
  const { orderId } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || !order.paymentIntentId) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'new' }
      });
      return res.status(200).json({ success: true, message: 'Оплата подтверждена' });
    } else {
      return res.status(400).json({ success: false, status: paymentIntent.status });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка проверки оплаты' });
  }
};


// export const createOrder = async (req: any, res: any) => {
//   const { design, items } = req.body; 
//   const userId = req.user.id;

//   try {
//     const productIds = items.map((i) => i.id);
//     const products = await prisma.catalog.findMany({ where: { id: { in: productIds } }});
    
//     const totalAmount = items.reduce((sum, item) => {
//       const product = products.find((p) => p.id === item.id);
//       return sum + (Number(product?.price || 0) * item.quantity);
//     }, 0);

//     const order = await prisma.$transaction(async (tx) => {
//       const newOrder = await tx.order.create({
//         data: { userId, design, status: 'pending' },
//       });

//       await tx.orderCatalog.createMany({
//         data: items.map((item) => ({
//           orderId: newOrder.id,
//           catalogId: item.id,
//           quantity: item.quantity,
//           weight: item.weight || 1.5,
//         })),
//       });
//       return newOrder;
//     });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalAmount * 100),
//       currency: 'usd',
//       metadata: { orderId: order.id }, 
//     });

//     res.status(201).json({
//       orderId: order.id,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка создания заказа' });
//   }
// };

// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body, 
//       sig, 
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object;
//     const orderId = paymentIntent.metadata.orderId;

//     await prisma.order.update({
//       where: { id: orderId },
//       data: { status: 'paid' },
//     });
    
//     console.log(`Заказ ${orderId} успешно оплачен.`);
//   }

//   res.json({ received: true });
// };
