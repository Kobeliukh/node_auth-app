import { userRepository } from '../repositories/user.repository.js';

export const authService = {
  register: async (user) => {
    const existingUser = await userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    return userRepository.createUser(user);
  },
};
