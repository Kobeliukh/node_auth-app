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

  setRefreshToken: (res, refreshToken) => {
    return res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH);
    } catch {
      return null;
    }
  },

  updateRefreshToken: (oldRefreshToken, newRefreshToken) => {
    return refreshTokenRepository.updateRefreshToken(
      oldRefreshToken,
      newRefreshToken,
    );
  },

  deleteRefreshToken: (refreshToken) => {
    return refreshTokenRepository.deleteRefreshToken(refreshToken);
  },
};
