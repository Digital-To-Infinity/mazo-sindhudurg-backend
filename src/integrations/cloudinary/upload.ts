import cloudinary from './client'
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary'

/**
 * Uploads a buffer to Cloudinary using a stream.
 */
export function uploadToCloudinary(
  buffer: Buffer,
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error || !result) return reject(error || new Error('Upload failed'))
      resolve(result)
    })
    stream.end(buffer)
  })
}
