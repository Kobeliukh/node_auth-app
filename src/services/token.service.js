import jwt from 'jsonwebtoken';
// eslint-disable-next-line max-len
import { refreshTokenRepository } from '../repositories/refreshToken.repository.js';

export const tokenService = {
  generateTokens: (userId) => {
    return {
      accessToken: jwt.sign({ userId }, process.env.JWT_ACCESS, {
        expiresIn: '10m',
      }),
      refreshToken: jwt.sign({ userId }, process.env.JWT_REFRESH, {
        expiresIn: '30d',
      }),
    };
  },

  saveRefreshToken: (userId, refreshToken) => {
    return refreshTokenRepository.saveRefreshToken(userId, refreshToken);
  },
};
