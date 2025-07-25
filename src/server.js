import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';

import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cookieParser());

  app.use(cors());

  app.use('/docs', swaggerDocs());

  app.use(router);
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Slim Moms',
    });
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
