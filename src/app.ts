import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { env } from './config/env'
import router from './routes/index'
import { errorHandler } from './middleware/error'
import { notFoundHandler } from './middleware/not-found'
import { globalRateLimit } from './middleware/rate-limit'

const app = express()

// Security
app.use(helmet())
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}))

// Rate limiting
app.use(globalRateLimit)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV, timestamp: new Date().toISOString() })
})

// API routes
app.use('/api', router)

// 404 & error handlers (must be last)
app.use(notFoundHandler)
app.use(errorHandler)

export default app
