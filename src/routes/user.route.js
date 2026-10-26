import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { usersController } from '../controllers/users.controller';
import { catchError } from '../utils/catchError';

export const usersRouter = Router();

usersRouter.get(
  '/me',
  authMiddleware,
  catchError(usersController.getUserProfile),
);
