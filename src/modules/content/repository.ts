import { db } from '@/config/database'

interface FindAllParams {
  q?: string
  type?: string
  status?: string
  page: number
  limit: number
}

export class ContentRepository {
  async findAll({ q, type, status, page, limit }: FindAllParams) {
    const where: any = {}
    if (q) where.OR = [{ title: { contains: q } }, { excerpt: { contains: q } }]
    if (type && type !== 'all') where.type = type.toUpperCase()
    if (status) where.status = status.toUpperCase()

    const [items, total] = await Promise.all([
      db.content.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: { seo: true },
      }),
      db.content.count({ where }),
    ])

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  findById(id: number) {
    return db.content.findUnique({
      where: { id },
      include: { seo: true, taxonomies: { include: { taxonomy: true } }, media: { include: { media: true } } },
    })
  }

  findRelated(type: string, excludeId: number) {
    return db.content.findMany({
      where: { type: type.toUpperCase() as any, status: 'PUBLISHED', id: { not: excludeId } },
      take: 4,
      orderBy: { updatedAt: 'desc' },
    })
  }

  create(data: any) {
    return db.content.create({ data })
  }

  update(id: number, data: any) {
    return db.content.update({ where: { id }, data })
  }

  delete(id: number) {
    return db.content.delete({ where: { id } })
  }
}
