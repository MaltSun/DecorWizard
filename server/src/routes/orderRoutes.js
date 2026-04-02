import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { createOrder, getUserOrders, updateOrderStatus, cancelOrder } from '../controllers/orderController.js';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/user', getUserOrders);

// Только владелец может менять статус и отменять
router.patch('/:id/status', requireRole('OWNER'), updateOrderStatus);
router.delete('/:id', cancelOrder);

export default router;