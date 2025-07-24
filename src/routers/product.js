import express from 'express';
import {getProducts} from '../controllers/product.js';

const router = express.Router();

//Query string ile ürün arama route'u
router.get('/', getProducts);

export default router;
