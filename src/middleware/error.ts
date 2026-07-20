import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/shared/errors'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { errors: err.details }),
    })
  }

  // Prisma unique constraint
  if ((err as any).code === 'P2002') {
    return res.status(409).json({ success: false, message: 'A record with this value already exists.' })
  }

  console.error('Unhandled error:', err)
  return res.status(500).json({ success: false, message: 'Internal server error' })
}
