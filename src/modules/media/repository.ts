import { db } from '@/config/database'

export class MediaRepository {
  findAll() { return db.media.findMany({ orderBy: { createdAt: 'desc' } }) }
  findById(id: number) { return db.media.findUnique({ where: { id } }) }
  create(data: any) { return db.media.create({ data }) }
  delete(id: number) { return db.media.delete({ where: { id } }) }
}
