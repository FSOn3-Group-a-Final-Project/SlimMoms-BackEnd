import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addProductToDiary,
  removeProductFromDiary,
  getDiaryByDate,
} from '../controllers/diary.js';

const router = express.Router();

router.post('/:date/products', authenticate, addProductToDiary);
router.delete('/:date/products/:productId', authenticate, removeProductFromDiary);
router.get('/:date', authenticate, getDiaryByDate);

export default router;