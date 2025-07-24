import express from 'express';
import {
  calculateCaloriesPublic,
  calculateCaloriesPrivate,
} from '../controllers/calcController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

//Herkese açık kalori hesapalama route'u
router.post('/calc-public', calculateCaloriesPublic);

//Giriş yapmış kullanıcı için
router.post('/calc-private', authenticate, calculateCaloriesPrivate);
export default router;
