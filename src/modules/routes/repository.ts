import { db } from '@/config/database'

export class RoutesRepository {
  findAll() {
    return db.route.findMany({ orderBy: { updatedAt: 'desc' } })
  }

  findById(id: number) {
    return db.route.findUnique({ where: { id } })
  }

  findBySlug(slug: string) {
    return db.route.findUnique({
      where: { slug },
      include: { Content: { include: { seo: true, taxonomies: { include: { taxonomy: true } } } } },
    })
  }

  create(data: any) {
    return db.route.create({ data })
  }

  update(id: number, data: any) {
    return db.route.update({ where: { id }, data })
  }

  delete(id: number) {
    return db.route.delete({ where: { id } })
  }
}
