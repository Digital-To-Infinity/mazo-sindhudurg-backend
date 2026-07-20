import cloudinary from './client'

type ImageTransform = {
  width?: number
  height?: number
  crop?: string
  quality?: string | number
  format?: string
}

/**
 * Builds an optimised Cloudinary delivery URL with transformations.
 */
export function buildDeliveryUrl(publicId: string, transforms: ImageTransform = {}): string {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...transforms,
    secure: true,
  })
}
