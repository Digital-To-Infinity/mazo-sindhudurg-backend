import { db } from '@/config/database'

export class TaxonomyRepository {
  findAll() { return db.taxonomy.findMany({ orderBy: { name: 'asc' } }) }
  findById(id: number) { return db.taxonomy.findUnique({ where: { id } }) }
  create(data: any) { return db.taxonomy.create({ data }) }
  update(id: number, data: any) { return db.taxonomy.update({ where: { id }, data }) }
  delete(id: number) { return db.taxonomy.delete({ where: { id } }) }
}
