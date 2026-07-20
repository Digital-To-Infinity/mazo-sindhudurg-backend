import { Request, Response } from 'express'
import crypto from 'crypto'
import { env } from '@/config/env'

/**
 * Verifies and handles Cloudinary webhook notifications.
 */
export function handleCloudinaryWebhook(req: Request, res: Response) {
  const signature = req.headers['x-cld-signature'] as string
  const timestamp = req.headers['x-cld-timestamp'] as string
  const body = JSON.stringify(req.body)

  const expectedSignature = crypto
    .createHash('sha256')
    .update(body + timestamp + env.CLOUDINARY_API_SECRET)
    .digest('hex')

  if (signature !== expectedSignature) {
    return res.status(401).json({ message: 'Invalid webhook signature' })
  }

  const { notification_type, public_id } = req.body
  console.log(`Cloudinary webhook: ${notification_type} — ${public_id}`)

  // Handle specific events here (e.g., moderation_passed, delete)
  res.status(200).json({ received: true })
}
