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
}
