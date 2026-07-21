import app from './app'
import { env } from './config/env'
import { db } from './config/database'

const PORT = Number(env.PORT) || 5000

;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

async function bootstrap() {
  try {
    // Test database connection
    await db.$connect()
    console.log('✅ Database connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📦 Environment: ${env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    await db.$disconnect()
    process.exit(1)
  }
}

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  await db.$disconnect()
  process.exit(0)
})

bootstrap()
