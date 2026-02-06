import { config } from '../config/index.js';

export const createOrder = async (req, res) => {
  const { design, status = 'new', catalogIds } = req.body; // catalogIds — массив ID из каталога
  const userId = req.user.id;

  const order = await config.order.create({
    data: {
      userId,
      design,
      status,
    },
  });

  // Добавляем позиции из каталога, если есть
  if (catalogIds?.length) {
    await config.orderCatalog.createMany({
      data: catalogIds.map(catalogId => ({
        orderId: order.id,
        catalogId,
      })),
    });
  }

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await config.order.findMany({
    where: { userId: req.user.id },
    include: { orderCatalog: { include: { catalog: true } } },
  });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  if (req.user.role !== 'OWNER') return res.status(403).json({ error: 'Только владелец' });

  const { id } = req.params;
  const { status } = req.body;

  const updated = await config.order.update({
    where: { id },
    data: { status },
  });

  res.json(updated);
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  await config.order.update({
    where: { id },
    data: { status: 'cancelled' },
  });

  res.status(200).json({ message: 'Заказ отменён' });
};