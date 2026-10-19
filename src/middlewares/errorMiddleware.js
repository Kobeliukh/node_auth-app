import { ApiError } from '../exceptions/api.error.js';

export const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    console.error(error);

    res
      .status(error.status)
      .send({ message: error.message, errors: error.errors });

    return;
  }

  console.error(error);
  res.status(500).send({ message: 'Internal server error.', errors: {} });
};
