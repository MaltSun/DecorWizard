import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { getAllCatalog, getCatalogItem, createCatalogItem, deleteCatalogItem } from '../controllers/catalogController.js';

const router = Router();

// Публичные маршруты (не требуют аутентификации)
router.get('/', getAllCatalog);
router.get('/:id', getCatalogItem);

// Защищенные маршруты (требуют аутентификации)
router.post('/', authenticate, createCatalogItem);
router.put('/:id', authenticate,createCatalogItem);
router.delete('/:id',authenticate, deleteCatalogItem);

export default router;