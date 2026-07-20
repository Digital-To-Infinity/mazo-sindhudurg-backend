import { TaxonomyRepository } from './repository'
import { NotFoundError } from '@/shared/errors'
import { slugify } from '@/shared/slug'

const repo = new TaxonomyRepository()

export class TaxonomyService {
  getAll() { return repo.findAll() }

  async getById(id: number) {
    const item = await repo.findById(id)
    if (!item) throw new NotFoundError('Taxonomy not found')
    return item
  }

  async create(data: any) {
    if (!data.slug && data.name) data.slug = slugify(data.name)
    return repo.create(data)
  }

  async update(id: number, data: any) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Taxonomy not found')
    return repo.update(id, data)
  }

  async delete(id: number) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Taxonomy not found')
    return repo.delete(id)
  }
}
