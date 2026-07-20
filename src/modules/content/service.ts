import { ContentRepository } from './repository'
import { NotFoundError } from '@/shared/errors'
import { slugify } from '@/shared/slug'

const repo = new ContentRepository()

export class ContentService {
  async getAll(params: { q?: string; type?: string; status?: string; page: number; limit: number }) {
    return repo.findAll(params)
  }

  async getById(id: number) {
    const content = await repo.findById(id)
    if (!content) throw new NotFoundError('Content not found')
    return content
  }

  async getRelated(type: string, excludeId: number) {
    return repo.findRelated(type, excludeId)
  }

  async create(data: any) {
    if (!data.slug && data.title) {
      data.slug = slugify(data.title)
    }
    return repo.create(data)
  }

  async update(id: number, data: any) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Content not found')
    return repo.update(id, data)
  }

  async delete(id: number) {
    const existing = await repo.findById(id)
    if (!existing) throw new NotFoundError('Content not found')
    return repo.delete(id)
  }
}
