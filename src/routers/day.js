import { Router } from 'express';
import { addProductController, deleteProductController, getDayInfoController } from '../controllers/day.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const dayRouter = Router();

dayRouter.post('/add-product', ctrlWrapper(addProductController));
dayRouter.delete('/delete-product', ctrlWrapper(deleteProductController));
dayRouter.get('/info', ctrlWrapper(getDayInfoController));

export default dayRouter;
