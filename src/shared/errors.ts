export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') { super(message, 404) }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') { super(message, 401) }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') { super(message, 403) }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) { super(message, 422, details) }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') { super(message, 409) }
}
