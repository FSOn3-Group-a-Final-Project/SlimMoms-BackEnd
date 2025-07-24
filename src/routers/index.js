import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './product.js';
import allProductsRouter from './allProducts.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/allProducts', allProductsRouter);


export default router;
