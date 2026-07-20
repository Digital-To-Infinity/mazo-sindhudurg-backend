import { Router } from 'express'
import { login, logout, me } from './controller'
import { validate } from '@/middleware/validate'
import { loginSchema } from './validation'
import { authMiddleware } from '@/middleware/auth'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/logout', logout)
router.get('/me', authMiddleware, me)

export default router
