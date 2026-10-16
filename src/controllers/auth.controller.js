'use strict';

import { authService } from '../services/auth.service.js';

export const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const newUser = await authService.register({ name, email, password });

      res.send(newUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
