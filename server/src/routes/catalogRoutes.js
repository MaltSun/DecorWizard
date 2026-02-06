import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { getAllCatalog, getCatalogItem, createCatalogItem, deleteCatalogItem } from '../controllers/catalogController.js';

const router = Router();

router.get('/', getAllCatalog);
router.get('/:id', getCatalogItem);

// Только для владельца
router.use(authenticate, requireRole('OWNER'));
router.post('/', createCatalogItem);
router.delete('/:id', deleteCatalogItem);

export default router;