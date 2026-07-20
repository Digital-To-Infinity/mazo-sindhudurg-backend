import { Router } from 'express'
import { getAll, getById, create, update, remove } from './controller'
import { authMiddleware } from '@/middleware/auth'
import { requireRole } from '@/middleware/roles'

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', authMiddleware, requireRole('ADMIN', 'EDITOR'), create)
router.put('/:id', authMiddleware, requireRole('ADMIN', 'EDITOR'), update)
router.delete('/:id', authMiddleware, requireRole('ADMIN'), remove)

export default router
