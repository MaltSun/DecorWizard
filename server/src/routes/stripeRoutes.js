import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {createStripePaymentIntent, verifyPayment } from '../controllers/stripeController.ts';

const router = Router();

router.use(authenticate);

router.post('/', createStripePaymentIntent);

router.post('/verify-payment', verifyPayment )

export default router;