import { Request, Response, NextFunction } from 'express'
import { db } from '@/config/database'
import { sendSuccess } from '@/shared/response'
import { parsePagination } from '@/shared/pagination'

export const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q = '', type } = req.query as Record<string, string>
    const { page, limit } = parsePagination(req.query)

    const where: any = {
      status: 'PUBLISHED',
      OR: [{ title: { contains: q } }, { excerpt: { contains: q } }],
    }
    if (type && type !== 'all') where.type = type.toUpperCase()

    const [items, total] = await Promise.all([
      db.content.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { updatedAt: 'desc' } }),
      db.content.count({ where }),
    ])

    sendSuccess(res, { items, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (err) { next(err) }
}
