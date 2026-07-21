import { z } from 'zod'

const contentTypeEnum = z.enum(['PAGE', 'BEACH', 'FORT', 'FOOD', 'STAY', 'ACTIVITY', 'EVENT', 'BLOG'])
const contentStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'PENDING'])

export const createContentSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(200),
    slug: z.string().optional(),
    excerpt: z.string().max(500).optional(),
    type: contentTypeEnum,
    status: contentStatusEnum.default('DRAFT'),
    heroImage: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    body: z.any().optional(),
  }),
})

export const updateContentSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200).optional(),
    slug: z.string().optional(),
    excerpt: z.string().max(500).optional(),
    type: contentTypeEnum.optional(),
    status: contentStatusEnum.optional(),
    heroImage: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    body: z.any().optional(),
  }),
})
