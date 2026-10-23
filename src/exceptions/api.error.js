export class ApiError extends Error {
  constructor({ message, status, errors = {} }) {
    super(message);

    this.errors = errors;
    this.status = status;
  }

  static unprocessableEntity({ message, errors }) {
    return new ApiError({
      message,
      errors,
      status: 422,
    });
  }

  static serviceUnavailable({ errors }) {
    return new ApiError({
      message: 'Service Unavailable.',
      errors,
      status: 503,
    });
  }

  static badRequest({ message, errors }) {
    return new ApiError({
      message,
      errors,
      status: 400,
    });
  }

  static unauthorized({ message, errors }) {
    return new ApiError({
      message,
      errors,
      status: 401,
    });
  }

  static forbidden({ message, errors }) {
    return new ApiError({
      message,
      errors,
      status: 404,
    });
  }
}
