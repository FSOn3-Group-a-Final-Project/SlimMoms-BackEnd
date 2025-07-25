import { Router } from 'express';
import { getAllProductsController, createProduct } from '../controllers/allProducts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/', ctrlWrapper(getAllProductsController));

//ürün ekleme
router.post('/', createProduct);
export default router;
