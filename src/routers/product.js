import express from 'express';
import {getFilteredProducts} from '../controllers/product.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addProductToDiary,
  removeProductFromDiary,
  getDiaryByDate,
} from '../controllers/diary.js';

const router = express.Router();

//Query string ile ürün arama route'u
router.get('/', getFilteredProducts);

router.post('/', authenticate, addProductToDiary);
router.delete('/:productId', authenticate, removeProductFromDiary);
router.get("/", authenticate, getDiaryByDate);
export default router;
