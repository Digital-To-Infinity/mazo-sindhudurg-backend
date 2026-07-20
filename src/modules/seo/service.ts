import { db } from '@/config/database'

export class SeoService {
  async getByContentId(contentId: number) {
    return db.seo.findUnique({ where: { contentId } })
  }

  async upsert(contentId: number, data: any) {
    return db.seo.upsert({
      where: { contentId },
      update: data,
      create: { ...data, contentId },
    })
  }
}
