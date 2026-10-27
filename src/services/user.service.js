import { userRepository } from '../repositories/user.repository.js';
import { sendActivationEmailPending } from '../utils/sendActivationEmail.js';

export const userService = {
  getUserData: (userId) => {
    return userRepository.findById(userId);
  },

  updateUserName: (id, name) => {
    return userRepository.updateUser({ where: { id }, data: { name } });
  },

  updateUserPassword: (id, password) => {
    return userRepository.updateUser({ where: { id }, data: { password } });
  },

  setPendingEmail: async (id, pendingEmail) => {
    const pendingEmailConfirmationToken = crypto.randomUUID();

    await sendActivationEmailPending(
      pendingEmail,
      pendingEmailConfirmationToken,
    );

    return userRepository.updateUser({
      where: { id },
      data: { pendingEmail, pendingEmailConfirmationToken },
    });
  },

  normalize: ({ id, email, name }) => {
    return { id, email, name };
  },
};
