import { db } from '../utils/db.js';

export const userRepository = {
  createUser: ({ name, email, password }) => {
    return db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  },
};
