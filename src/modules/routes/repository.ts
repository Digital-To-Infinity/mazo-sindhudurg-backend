import { db } from '@/config/database'

export class RoutesRepository {
  findAll() {
    return db.routes.findMany({ orderBy: { updated_at: 'desc' } })
  }

  findById(id: number) {
    return db.routes.findUnique({ where: { id: BigInt(id) } })
  }

  findBySlug(slug: string) {
    return db.routes.findUnique({
      where: { path: slug },
    })
  }

  create(data: any) {
    return db.routes.create({ data })
  }

  update(id: number, data: any) {
    return db.routes.update({ where: { id: BigInt(id) }, data })
  }

  delete(id: number) {
    return db.routes.delete({ where: { id: BigInt(id) } })
  }
}
