import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { createReview, createAnswer, getAllReviews } from '../controllers/reviewController.js';

const router = Router();

router.get('/all', getAllReviews);

router.use(authenticate);

router.post('/create', createReview);
router.post('/answer', requireRole('OWNER'), createAnswer);

export default router;