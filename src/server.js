import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import calcRoutes from './routers/calcRoutes.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import productsRoutes from './routers/product.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );
  app.use(cors());
  app.use('/api', calcRoutes); // hesapalama routu
  // app.use('/api/products', productsRoutes); // arama routu'u

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Slim Moms',
    });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
