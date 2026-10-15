import { userRepository } from '../repositories/user.repository.js';

export const authService = {
  register: (user) => {
    return userRepository.createUser(user);
  },
};
