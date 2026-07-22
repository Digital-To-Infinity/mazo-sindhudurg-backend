import { db } from '@/config/database'

export class MediaRepository {
  findAll() { return db.media.findMany({
      take: 50,
      orderBy: { created_at: 'desc' },
    }) }
  findById(id: number) { return db.media.findUnique({ where: { id } }) }
  create(data: any) { return db.media.create({ data }) }
  delete(id: number) { return db.media.delete({ where: { id } }) }
}
