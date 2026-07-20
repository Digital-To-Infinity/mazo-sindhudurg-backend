import { z } from 'zod'

export const uploadMediaSchema = z.object({
  body: z.object({
    altText: z.string().max(200).optional(),
  }),
})
