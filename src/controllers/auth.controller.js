'use strict';

import { authService } from '../services/auth.service.js';

export const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await authService.register({ name, email, password });

    res.status(201).send(authService.normalize(newUser));
  },
};
