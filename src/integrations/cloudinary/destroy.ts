import cloudinary from './client'

/**
 * Permanently deletes an asset from Cloudinary by its public_id.
 */
export async function destroyFromCloudinary(publicId: string): Promise<void> {
  const result = await cloudinary.uploader.destroy(publicId)
  if (result.result !== 'ok' && result.result !== 'not found') {
    throw new Error(`Cloudinary destroy failed: ${result.result}`)
  }
}
