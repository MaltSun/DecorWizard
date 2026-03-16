import { Router } from 'express';
import { generateImage, generatePrompt } from '../controllers/generationController.js';

const router = Router();

router.post('/image', generateImage);
router.post('/prompt', generatePrompt);

export default router;