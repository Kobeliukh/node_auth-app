'use strict';

import express from 'express';
import { authRouter } from './routes/auth.route.js';

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/auth', authRouter);

  return app;
};
