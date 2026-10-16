import { ApiError } from '../exceptions/api.error.js';
import { userRepository } from '../repositories/user.repository.js';

export const authService = {
  register: async (user) => {
    const existingUser = await userRepository.findByEmail(user.email);

    if (existingUser) {
      throw ApiError.unprocessableEntity({
        message: 'Validation error.',
        errors: { email: 'This email is already taken.' },
      });
    }

    return userRepository.createUser(user);
  },
};
