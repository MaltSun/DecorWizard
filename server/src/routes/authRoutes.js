import { Router } from 'express';
import { register, login, test } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', test);
export default router;