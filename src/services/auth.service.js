import { ApiError } from '../exceptions/api.error.js';
import { userRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const authService = {
  register: async (user) => {
    const { email, password } = user;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw ApiError.unprocessableEntity({
        message: 'Validation error.',
        errors: { email: 'This email is already taken.' },
      });
    }

    const hash = await bcrypt.hash(password, 10);

    return userRepository.createUser({ ...user, password: hash });
  },
  normalize: ({ id, email, name }) => {
    return { id, email, name };
  },
};
