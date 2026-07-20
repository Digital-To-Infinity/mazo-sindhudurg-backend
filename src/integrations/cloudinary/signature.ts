import crypto from 'crypto'
import { env } from '@/config/env'

/**
 * Generates a signed upload signature for direct browser-to-Cloudinary uploads.
 */
export function generateUploadSignature(params: Record<string, string | number>) {
  const timestamp = Math.round(Date.now() / 1000)
  const allParams = { ...params, timestamp }

  const sortedKeys = Object.keys(allParams).sort()
  const signatureString = sortedKeys
    .map((k) => `${k}=${allParams[k as keyof typeof allParams]}`)
    .join('&')

  const signature = crypto
    .createHash('sha256')
    .update(signatureString + env.CLOUDINARY_API_SECRET)
    .digest('hex')

  return { signature, timestamp, api_key: env.CLOUDINARY_API_KEY }
}
