import { ApiError } from '../exceptions/api.error';
import { userService } from '../services/user.service';

export const usersController = {
  getUserProfile: async (req, res) => {
    const { userId } = req.user;

    const userData = await userService.getUserData(userId);

    if (!userData) {
      throw ApiError.notFound({ message: 'User not found.' });
    }

    res.status(200).send({ userData: userService.normalize(userData) });
  },
};
