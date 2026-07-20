import { Router } from 'express'
import { getAll, getBySlug, create, update, remove } from './controller'
import { authMiddleware } from '@/middleware/auth'
import { requireRole } from '@/middleware/roles'

const router = Router()

router.get('/', getAll)
router.get('/:slug', getBySlug)
router.post('/', authMiddleware, requireRole('ADMIN'), create)
router.put('/:id', authMiddleware, requireRole('ADMIN'), update)
router.delete('/:id', authMiddleware, requireRole('ADMIN'), remove)

export default router
