import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {createStripePaymentIntent } from '../controllers/stripeController.ts';

const router = Router();

router.use(authenticate);

router.post('/', createStripePaymentIntent);

export default router;