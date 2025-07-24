import express from 'express';
import {getFilteredProducts} from '../controllers/product.js';

const router = express.Router();

//Query string ile ürün arama route'u
router.get('/', getFilteredProducts);

export default router;
