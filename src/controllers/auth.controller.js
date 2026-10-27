'use strict';

import { ApiError } from '../exceptions/api.error.js';
import { authService } from '../services/auth.service.js';
import { tokenService } from '../services/token.service.js';
import { userService } from '../services/user.service.js';

export const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    const errors = {
      email: authService.validateEmail(email),
      password: authService.validatePassword(password),
      name: authService.validateName(name),
    };

    if (Object.values(errors).some((error) => error)) {
      throw ApiError.unprocessableEntity({
        message: 'Validation error.',
        errors,
      });
    }

    const newUser = await authService.register({ name, email, password });

    res.status(201).send(userService.normalize(newUser));
  },

  activate: async (req, res) => {
    const { activationToken } = req.params;

    const { user, accessToken, refreshToken } =
      await authService.activate(activationToken);

    tokenService
      .setRefreshToken(res, refreshToken)
      .status(200)
      .send({ user, accessToken });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.login({
      email,
      password,
    });

    tokenService
      .setRefreshToken(res, refreshToken)
      .status(200)
      .send({ user, accessToken });
  },

  refresh: async (req, res) => {
    const userRefreshToken = req.cookies.refreshToken;

    if (!userRefreshToken) {
      throw ApiError.unauthorized({ message: 'Refresh token is missing' });
    }

    const refreshTokenData = tokenService.verifyRefreshToken(userRefreshToken);

    if (!refreshTokenData) {
      throw ApiError.unauthorized({ message: 'Refresh token is invalid.' });
    }

    const { accessToken, refreshToken } = tokenService.generateTokens(
      refreshTokenData.userId,
    );

    await tokenService.updateRefreshToken(userRefreshToken, refreshToken);

    tokenService
      .setRefreshToken(res, refreshToken)
      .status(200)
      .send({ accessToken });
  },

  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.sendStatus(204);

      return;
    }

    await tokenService.deleteRefreshToken(refreshToken);

    res.clearCookie('refreshToken').sendStatus(204);
  },

  confirmNewEmail: async (req, res) => {
    const { activationToken } = req.params;

    await authService.confirmNewEmail(activationToken);

    res.sendStatus(204);
  },

  requestPasswordReset: async (req, res) => {
    const { email } = req.body;

    await authService.requestPasswordReset(email);

    res.sendStatus(204);
  },

  resetPassword: async (req, res) => {
    const { confirmationToken } = req.params;
    const { newPassword, newPasswordConfirmation } = req.body;

    if (newPassword !== newPasswordConfirmation) {
      throw ApiError.unprocessableEntity({
        message: 'Validation error.',
        errors: { password: 'passwords must match.' },
      });
    }

    await authService.resetPassword(newPassword, confirmationToken);

    res.sendStatus(204);
  },
};
