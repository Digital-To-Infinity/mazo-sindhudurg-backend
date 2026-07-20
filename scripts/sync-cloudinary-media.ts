import { db } from '../src/config/database'
import cloudinary from '../src/integrations/cloudinary/client'

/**
 * Syncs Cloudinary media assets into the local database.
 * Useful for initial import or reconciliation after direct uploads.
 */
async function main() {
  console.log('☁️  Syncing Cloudinary media to database...')

  const { resources } = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'mazo-sindhudurg',
    max_results: 500,
  })

  let created = 0
  let skipped = 0

  for (const asset of resources) {
    const existing = await db.media.findUnique({ where: { publicId: asset.public_id } })
    if (existing) { skipped++; continue }

    await db.media.create({
      data: {
        url: asset.secure_url,
        publicId: asset.public_id,
        width: asset.width,
        height: asset.height,
        format: asset.format,
        bytes: asset.bytes,
      },
    })
    created++
  }

  console.log(`✅ Sync complete. Created: ${created}, Skipped: ${skipped}`)
}

main().catch(console.error).finally(() => db.$disconnect())
