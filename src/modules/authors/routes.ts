import { Router } from 'express'
import { getAll } from './controller'

const router = Router()

// Publicly accessible, or we could protect it with authMiddleware if needed.
// For admin panel usage, usually we might protect it, but authors list might be public too.
router.get('/', getAll)

export default router
