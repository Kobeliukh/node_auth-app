import { db } from '../utils/db.js';

export const refreshTokenRepository = {
  saveRefreshToken: (userId, refreshToken) => {
    return db.refreshToken.create({ data: { userId, refreshToken } });
  },
};
