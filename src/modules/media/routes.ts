import { Router } from 'express'
import multer from 'multer'
import { getAll, upload, remove } from './controller'
import { authMiddleware } from '@/middleware/auth'

const router = Router()
const memoryStorage = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

router.get('/', authMiddleware, getAll)
router.post('/upload', authMiddleware, memoryStorage.single('file'), upload)
router.delete('/:id', authMiddleware, remove)

export default router
