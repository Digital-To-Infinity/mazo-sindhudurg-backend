import { Request, Response, NextFunction } from 'express'
import { db } from '@/config/database'
import { sendSuccess } from '@/shared/response'
import { parsePagination } from '@/shared/pagination'

export const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q = '', type } = req.query as Record<string, string>
    const { page, limit } = parsePagination(req.query)

    const where: any = {
      status: 'published',
      OR: [{ title: { contains: q } }, { excerpt: { contains: q } }],
    }
    if (type && type !== 'all') where.content_type = type.toLowerCase()

    const [items, total] = await Promise.all([
      db.articles.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { updated_at: 'desc' } }),
      db.articles.count({ where }),
    ])

    sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (err) { next(err) }
}
