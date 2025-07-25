import express from 'express';
import {
  getFilteredProducts,
  addProductToDiary,
  removeProductFromDiary,
  getDiaryByDate,
  getAllDiaryProducts,
} from '../controllers/product.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

//Query string ile ürün arama route'u
router.get('/', getFilteredProducts);
router.get('/diary', authenticate, getAllDiaryProducts);

router.post('/', authenticate, addProductToDiary);
router.delete('/diary/:date/:productId', authenticate, removeProductFromDiary);
router.get('/diary/:date', authenticate, getDiaryByDate);
export default router;
