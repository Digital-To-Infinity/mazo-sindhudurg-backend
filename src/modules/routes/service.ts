import { RoutesRepository } from './repository'
import { NotFoundError } from '@/shared/errors'

const repo = new RoutesRepository()

export class RoutesService {
  async getAll() {
    return repo.findAll()
  }

  async getBySlug(slug: string) {
    const route = await repo.findBySlug(slug)
    if (!route) throw new NotFoundError(`Route '${slug}' not found`)
    return route
  }

  async create(data: any) {
    return repo.create(data)
  }

  async update(id: number, data: any) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Route not found')
    return repo.update(id, data)
  }

  async delete(id: number) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Route not found')
    return repo.delete(id)
  }
}
