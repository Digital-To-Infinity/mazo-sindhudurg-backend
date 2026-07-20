import { Router } from 'express'
import { getByContentId, upsert } from './controller'
import { authMiddleware } from '@/middleware/auth'

const router = Router()

router.get('/:contentId', getByContentId)
router.put('/:contentId', authMiddleware, upsert)

export default router
