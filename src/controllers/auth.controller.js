'use strict';

export const authController = {
  register: (req, res) => {
    const { email, password } = req.body;

    res.status(200).send(`${email} ${password}`);
  },
};
