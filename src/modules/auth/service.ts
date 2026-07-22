import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/config/database'
import { env } from '@/config/env'
import { UnauthorizedError, NotFoundError } from '@/shared/errors'

export class AuthService {
  async login(email: string, password: string) {
    const user = await db.users.findUnique({ where: { email }, include: { roles: true } })
    if (!user) throw new UnauthorizedError('Invalid credentials')

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) throw new UnauthorizedError('Invalid credentials')

    const roleName = user.roles.slug === 'super-admin' || user.roles.slug === 'admin' ? 'ADMIN' : 'EDITOR'

    const token = jwt.sign(
      { userId: user.id.toString(), role: roleName },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    )

    return {
      token,
      user: { id: user.id.toString(), email: user.email, role: roleName },
    }
  }

  async getMe(userId: string) {
    const user = await db.users.findUnique({
      where: { id: BigInt(userId) },
      include: { roles: true }
    })
    if (!user) throw new NotFoundError('User not found')
    
    const roleName = user.roles.slug === 'super-admin' || user.roles.slug === 'admin' ? 'ADMIN' : 'EDITOR'
    return {
      id: user.id.toString(),
      email: user.email,
      role: roleName,
      createdAt: user.created_at
    }
  }
}
