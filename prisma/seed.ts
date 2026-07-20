import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mazosindhudurg.com' },
    update: {},
    create: {
      email: 'admin@mazosindhudurg.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user:', admin.email)

  // Create default settings
  const settings = [
    { key: 'site_name', value: 'Mazo Sindhudurg' },
    { key: 'site_tagline', value: 'Your guide to the Jewel of the Konkan Coast' },
    { key: 'contact_email', value: 'hello@mazosindhudurg.com' },
  ]
  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log('✅ Settings seeded')

  // Seed sample taxonomies
  const taxonomies = [
    { name: 'Beach', slug: 'beach', type: 'content_type' },
    { name: 'Fort', slug: 'fort', type: 'content_type' },
    { name: 'Food', slug: 'food', type: 'content_type' },
    { name: 'Malvan', slug: 'malvan', type: 'location' },
    { name: 'Sindhudurg Fort', slug: 'sindhudurg-fort', type: 'location' },
  ]
  for (const t of taxonomies) {
    await prisma.taxonomy.upsert({ where: { slug: t.slug }, update: {}, create: t })
  }
  console.log('✅ Taxonomies seeded')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
