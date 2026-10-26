import { ApiError } from '../exceptions/api.error';
import { authService } from '../services/auth.service';
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

  changeUserName: async (req, res) => {
    const { userId } = req.user;
    const { newUserName } = req.body;

    const errors = {
      name: authService.validateName(newUserName),
    };

    if (Object.values(errors).some((error) => error)) {
      throw ApiError.unprocessableEntity({
        message: 'Validation error.',
        errors,
      });
    }

    const updatedUser = await userService.updateUserName(userId, newUserName);

    res.status(200).send(userService.normalize(updatedUser));
  },
};
