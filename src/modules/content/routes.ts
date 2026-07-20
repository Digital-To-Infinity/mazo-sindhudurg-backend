import { Router } from 'express'
import { getAll, getById, getRelated, create, update, remove } from './controller'
import { authMiddleware } from '@/middleware/auth'
import { validate } from '@/middleware/validate'
import { createContentSchema, updateContentSchema } from './validation'

const router = Router()

router.get('/', getAll)
router.get('/related', getRelated)
router.get('/:id', getById)
router.post('/', authMiddleware, validate(createContentSchema), create)
router.put('/:id', authMiddleware, validate(updateContentSchema), update)
router.delete('/:id', authMiddleware, remove)

export default router
