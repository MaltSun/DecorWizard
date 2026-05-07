import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { createReview, createAnswer } from '../controllers/reviewController.js';

const router = Router();

router.use(authenticate);

router.post('/create', createReview);
router.post('/answer', requireRole('OWNER'), createAnswer);

export default router;