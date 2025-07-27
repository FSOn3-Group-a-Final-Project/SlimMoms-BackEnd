import { Router } from 'express';
import { getAllProductsController, createProduct } from '../controllers/allProducts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = Router();
router.get('/', ctrlWrapper(getAllProductsController));

//ürün ekleme
router.post('/', authenticate, createProduct); // sadece kayıtlı kişi ekleyebilsin.
export default router;
