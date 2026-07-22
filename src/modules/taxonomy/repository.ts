import { db } from '@/config/database'

export class TaxonomyRepository {
  findAll() { return db.categories.findMany({ orderBy: { name: 'asc' } }) }
  findById(id: number) { return db.categories.findUnique({ where: { id: BigInt(id) } }) }
  create(data: any) { return db.categories.create({ data }) }
  update(id: number, data: any) { return db.categories.update({ where: { id: BigInt(id) }, data }) }
  delete(id: number) { return db.categories.delete({ where: { id: BigInt(id) } }) }
}
