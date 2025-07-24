import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import calcRoutes from './routers/calcRoutes.js';

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

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Slim Moms',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
