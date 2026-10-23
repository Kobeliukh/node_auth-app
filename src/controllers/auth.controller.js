'use strict';

import { ApiError } from '../exceptions/api.error.js';
import { authService } from '../services/auth.service.js';

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

    res.status(201).send(authService.normalize(newUser));
  },

  activate: async (req, res) => {
    const { activationToken } = req.params;

    await authService.activate(activationToken);

    res.sendStatus(204);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.login({
      email,
      password,
    });

    res
      .cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .send({ user, accessToken });
  },
};
