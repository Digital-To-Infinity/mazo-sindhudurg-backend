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
    const existing = await db.media.findUnique({ where: { public_id: asset.public_id } })
    if (!existing) {
      await db.media.create({
        data: {
          asset_id: asset.asset_id,
          public_id: asset.public_id,
          secure_url: asset.secure_url,
          provider: 'cloudinary',
          width: asset.width,
          height: asset.height,
          format: asset.format,
          bytes: asset.bytes,
        },
      })
      created++
    } else {
      skipped++
    }
  }

  console.log(`✅ Sync complete. Created: ${created}, Skipped: ${skipped}`)
}

main().catch(console.error).finally(() => db.$disconnect())
