import { Router } from 'express'
import authRoutes from '@/modules/auth/routes'
import routesRoutes from '@/modules/routes/routes'
import contentRoutes from '@/modules/content/routes'
import taxonomyRoutes from '@/modules/taxonomy/routes'
import mediaRoutes from '@/modules/media/routes'
import seoRoutes from '@/modules/seo/routes'
import authorRoutes from '@/modules/authors/routes'
import { search } from '@/modules/search/index'
import { getAll as getSubmissions, create as createSubmission, updateStatus } from '@/modules/submissions/index'
import { getAll as getSettings, upsert as upsertSetting } from '@/modules/settings/index'
import { authMiddleware } from '@/middleware/auth'
import { requireRole } from '@/middleware/roles'

const router = Router()

router.use('/auth', authRoutes)
router.use('/routes', routesRoutes)
router.use('/content', contentRoutes)
router.use('/taxonomies', taxonomyRoutes)
router.use('/media', mediaRoutes)
router.use('/seo', seoRoutes)
router.use('/authors', authorRoutes)

// Search
router.get('/search', search)

// Submissions
router.post('/submissions', createSubmission)
router.get('/submissions', authMiddleware, getSubmissions)
router.patch('/submissions/:id/status', authMiddleware, requireRole('ADMIN'), updateStatus)

// Settings
router.get('/settings', getSettings)
router.put('/settings', authMiddleware, requireRole('ADMIN'), upsertSetting)

export default router
