import express from 'express';
import { calculateCaloriesPublic } from '../controllers/calcController.js';

const router = express.Router();

//Herkese açık kalori hesapalama route'u
router.post('/calc-public', calculateCaloriesPublic);

export default router;