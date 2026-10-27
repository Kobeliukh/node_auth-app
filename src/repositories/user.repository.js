import { db } from '../utils/db.js';

export const userRepository = {
  createUser: ({ name, email, password, activationToken }) => {
    return db.user.create({
      data: {
        name,
        email,
        password,
        activationToken,
      },
    });
  },

  deleteUser: (email) => {
    return db.user.delete({ where: { email } });
  },

  findByEmail: (email) => {
    return db.user.findUnique({ where: { email } });
  },

  findByActivationToken: (activationToken) => {
    return db.user.findFirst({ where: { activationToken } });
  },

  updateUser: ({ where, data }) => {
    return db.user.update({ where, data });
  },

  findById: (id) => {
    return db.user.findUnique({ where: { id } });
  },

  findByPendingConfirmationToken: (pendingEmailConfirmationToken) => {
    return db.user.findFirst({ where: { pendingEmailConfirmationToken } });
  },
};
