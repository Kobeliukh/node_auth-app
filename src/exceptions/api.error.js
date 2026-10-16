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
}
