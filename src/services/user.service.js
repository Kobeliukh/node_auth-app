import { userRepository } from '../repositories/user.repository';

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

  normalize: ({ id, email, name }) => {
    return { id, email, name };
  },
};
