import { Request, Response, NextFunction } from 'express'
import { AuthService } from './service'
import { sendSuccess } from '@/shared/response'

const authService = new AuthService()

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    res.cookie('auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    sendSuccess(res, result, 'Login successful')
  } catch (err) {
    next(err)
  }
}

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('auth_token')
  sendSuccess(res, null, 'Logged out successfully')
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getMe((req as any).userId)
    sendSuccess(res, user)
  } catch (err) {
    next(err)
  }
}
