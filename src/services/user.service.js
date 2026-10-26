import { userRepository } from '../repositories/user.repository';

export const userService = {
  getUserData: (userId) => {
    return userRepository.findById(userId);
  },

  normalize: ({ id, email, name }) => {
    return { id, email, name };
  },
};
