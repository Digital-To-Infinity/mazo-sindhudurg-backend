import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '@/shared/errors'

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole
    if (!roles.includes(userRole)) {
      throw new ForbiddenError(`Requires one of roles: ${roles.join(', ')}`)
    }
    next()
  }
}
