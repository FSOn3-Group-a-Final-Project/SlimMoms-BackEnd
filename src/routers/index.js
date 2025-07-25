import { Router } from 'express';
import authRouter from './auth.js';
import productRouter from './product.js';
import allProductsRouter from './allProducts.js';

import calcRoutes from './calcRoutes.js'; // test için

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/allProducts', allProductsRouter);



router.use('/calculate', calcRoutes);
//router.use('/calcRoutes',calcRoutes); // test için

export default router;
