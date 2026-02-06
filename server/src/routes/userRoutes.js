import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile, deleteProfile } from '../controllers/userController.js';

const router = Router();

router.use(authenticate); // все роуты защищены

router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.delete('/profile', deleteProfile);

export default router;