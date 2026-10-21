import { ApiError } from '../exceptions/api.error.js';
import { userRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { sendActivationEmail } from '../utils/sendActivationEmail.js';

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
    const activationToken = crypto.randomUUID();

    try {
      const newUser = await userRepository.createUser({
        ...user,
        password: hash,
        activationToken,
      });

      await sendActivationEmail(email, activationToken);

      return newUser;
    } catch {
      await userRepository.deleteUser(email);

      throw ApiError.serviceUnavailable({});
    }
  },

  activate: async (activationToken) => {
    const user = await userRepository.findByActivationToken(activationToken);

    if (!user) {
      throw ApiError.badRequest({ message: 'Invalid token' });
    }

    return userRepository.udpateUser({
      where: { activationToken },
      data: { activationToken: null },
    });
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
