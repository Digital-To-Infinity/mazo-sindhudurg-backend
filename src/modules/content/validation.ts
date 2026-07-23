import { z } from 'zod'

const contentTypeEnum = z.enum(['page', 'beach', 'fort', 'food', 'stay', 'activity', 'event', 'blog', 'guide', 'plan', 'story', 'news'])
const contentStatusEnum = z.enum(['draft', 'published', 'archived', 'trash', 'pending_review', 'scheduled'])

export const createContentSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters').max(200),
    slug: z.string().optional(),
    excerpt: z.string().max(500).optional(),
    content_type: contentTypeEnum,
    status: contentStatusEnum.default('draft'),
    hero_media_id: z.number().optional().or(z.string().transform(v => parseInt(v, 10)).optional()),
    content_html: z.any().optional(),
    author_id: z.number().optional().or(z.string().transform(v => parseInt(v, 10)).optional()),
    tags: z.array(z.string()).optional()
  }),
})

export const updateContentSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200).optional(),
    slug: z.string().optional(),
    excerpt: z.string().max(500).optional(),
    content_type: contentTypeEnum.optional(),
    status: contentStatusEnum.optional(),
    hero_media_id: z.number().optional().or(z.string().transform(v => parseInt(v, 10)).optional()),
    content_html: z.any().optional(),
    author_id: z.number().optional().or(z.string().transform(v => parseInt(v, 10)).optional()),
    tags: z.array(z.string()).optional()
  }),
})
