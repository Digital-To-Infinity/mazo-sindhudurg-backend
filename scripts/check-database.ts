import { db } from '../src/config/database'

async function main() {
  console.log('🔍 Checking database connection...')
  try {
    await db.$connect()
    const userCount = await db.users.count()
    const contentCount = await db.articles.count()
    const mediaCount = await db.media.count()

    console.log('✅ Database connected successfully')
    console.log(`   Users:   ${userCount}`)
    console.log(`   Articles: ${contentCount}`)
    console.log(`   Media:   ${mediaCount}`)
  } catch (err) {
    console.error('❌ Database connection failed:', err)
    process.exit(1)
  }
}

main().finally(() => db.$disconnect())
