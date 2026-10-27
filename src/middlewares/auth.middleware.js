import { ApiError } from '../exceptions/api.error.js';
import { tokenService } from '../services/token.service.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    throw ApiError.unauthorized({ message: 'Access token is required.' });
  }

  const accessTokenData = tokenService.verifyAccessToken(accessToken);

  if (!accessTokenData) {
    throw ApiError.unauthorized({ message: 'Access token is invalid.' });
  }

  req.user = accessTokenData;

  next();
};
