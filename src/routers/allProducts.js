import { Router } from 'express';
import { getAllProductsController } from '../controllers/allProducts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/', ctrlWrapper(getAllProductsController));

export default router;
