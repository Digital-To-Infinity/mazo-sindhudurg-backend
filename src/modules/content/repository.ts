import { db } from '@/config/database'

interface FindAllParams {
  q?: string
  slug?: string
  type?: string
  status?: string
  page: number
  limit: number
}

export class ContentRepository {
  async findAll({ q, slug, type, status, page, limit }: FindAllParams) {
    const where: any = {}
    if (q) where.OR = [{ title: { contains: q } }, { excerpt: { contains: q } }]
    if (slug) where.slug = slug
    if (type && type !== 'all') where.content_type = type.toLowerCase()
    if (status) where.status = status.toLowerCase()

    const [items, total] = await Promise.all([
      db.articles.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updated_at: 'desc' },
        include: { media: true },
      }),
      db.articles.count({ where }),
    ])

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  findById(id: number) {
    return db.articles.findUnique({
      where: { id: BigInt(id) },
      include: { article_tags: { include: { tags: true } }, media: true },
    })
  }

  findRelated(type: string, excludeId: number) {
    return db.articles.findMany({
      where: { content_type: type as any, status: 'published', id: { not: BigInt(excludeId) } },
      take: 4,
      orderBy: { updated_at: 'desc' },
    })
  }

  create(data: any) {
    return db.articles.create({ data })
  }

  update(id: number, data: any) {
    return db.articles.update({ where: { id: BigInt(id) }, data })
  }

  delete(id: number) {
    return db.articles.delete({ where: { id: BigInt(id) } })
  }
}
