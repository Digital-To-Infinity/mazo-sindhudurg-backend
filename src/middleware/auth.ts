import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@/config/env'
import { UnauthorizedError } from '@/shared/errors'

interface JwtPayload {
  userId: number
  role: string
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const token =
    req.cookies?.auth_token ||
    req.headers.authorization?.replace('Bearer ', '')

  if (!token) throw new UnauthorizedError('Authentication required')

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    ;(req as any).userId = payload.userId
    ;(req as any).userRole = payload.role
    next()
  } catch {
    throw new UnauthorizedError('Invalid or expired token')
  }
}
