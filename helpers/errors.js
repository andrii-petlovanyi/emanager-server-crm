class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class AccessDeniedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

export { CustomError, NotAuthorizedError, ConflictError, AccessDeniedError };
