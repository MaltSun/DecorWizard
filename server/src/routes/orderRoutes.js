import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { createOrder, getUserOrders,  cancelOrder } from '../controllers/orderController.js';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/user', getUserOrders);

router.delete('/:id', cancelOrder);

export default router;