import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { usersController } from '../controllers/users.controller.js';
import { catchError } from '../utils/catchError.js';

export const usersRouter = Router();

usersRouter.get(
  '/me',
  authMiddleware,
  catchError(usersController.getUserProfile),
);

usersRouter.patch(
  '/me/name',
  authMiddleware,
  catchError(usersController.changeUserName),
);

usersRouter.patch(
  '/me/password',
  authMiddleware,
  catchError(usersController.changeUserPassword),
);

usersRouter.patch(
  '/me/email',
  authMiddleware,
  catchError(usersController.changeUserEmail),
);
