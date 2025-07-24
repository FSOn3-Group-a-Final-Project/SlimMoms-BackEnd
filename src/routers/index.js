import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './product.js';
import allProductsRouter from './allProducts.js';
import calcRouter from './calcRoutes.js';
import dayRouter from './day.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/allProducts', allProductsRouter);
router.use('/calories', calcRouter);
router.use('/day', dayRouter);

export default router;
