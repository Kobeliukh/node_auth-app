import { db } from '../utils/db.js';

export const refreshTokenRepository = {
  saveRefreshToken: (userId, refreshToken) => {
    return db.refreshToken.create({ data: { userId, refreshToken } });
  },

  updateRefreshToken: (oldRefreshToken, newRefreshToken) => {
    return db.refreshToken.update({
      where: { refreshToken: oldRefreshToken },
      data: { refreshToken: newRefreshToken },
    });
  },
};
