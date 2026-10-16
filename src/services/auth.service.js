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
  validateEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return 'Email is required.';
    }

    if (!emailRegex.test(email)) {
      return 'The email address is invalid.';
    }
  },
  validatePassword: (password) => {
    if (!password) {
      return 'Password is required.';
    }

    if (password.length < 8) {
      return 'The password is too short.';
    }

    if (password.length > 32) {
      return 'The password is too long.';
    }
  },
  validateName: (name) => {
    if (!name) {
      return 'Name is required.';
    }

    if (name.length < 3) {
      return 'The name is too short.';
    }
  },
  normalize: ({ id, email, name }) => {
    return { id, email, name };
  },
};
