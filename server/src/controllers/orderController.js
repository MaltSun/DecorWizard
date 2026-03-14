import { prisma } from '../config/prisma.js';

export const createOrder = async (req, res) => {
  const { design, status = 'new', catalogIds } = req.body; // catalogIds — массив ID из каталога
  const userId = req.user.id;

  const order = await prisma.order.create({
    data: {
      userId,
      design,
      status,
    },
  });

  if (catalogIds?.length) {
    await prisma.orderCatalog.createMany({
      data: catalogIds.map(catalogId => ({
        orderId: order.id,
        catalogId,
      })),
    });
  }

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { orderCatalog: { include: { catalog: true } } },
  });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  if (req.user.role !== 'OWNER') return res.status(403).json({ error: 'Только владелец' });

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
    data: { status: 'cancelled' },
  });

  res.status(200).json({ message: 'Заказ отменён' });
};