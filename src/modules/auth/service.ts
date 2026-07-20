import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/config/database'
import { env } from '@/config/env'
import { UnauthorizedError, NotFoundError } from '@/shared/errors'

export class AuthService {
  async login(email: string, password: string) {
    const user = await db.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedError('Invalid credentials')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new UnauthorizedError('Invalid credentials')

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    )

    return {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    }
  }

  async getMe(userId: number) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, createdAt: true },
    })
    if (!user) throw new NotFoundError('User not found')
    return user
  }
}
