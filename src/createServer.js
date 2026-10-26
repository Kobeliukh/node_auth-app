'use strict';

import express from 'express';
import { authRouter } from './routes/auth.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

export const createServer = () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use('/auth', authRouter);

  app.use(errorMiddleware);

  return app;
};
