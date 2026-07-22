import { db } from '@/config/database'

export class SeoService {
  async getByContentId(contentId: number, entityType: string = 'article') {
    return db.seo_metadata.findUnique({ 
      where: { 
        entity_type_entity_id: { entity_type: entityType, entity_id: BigInt(contentId) } 
      } 
    })
  }

  async upsert(contentId: number, data: any, entityType: string = 'article') {
    return db.seo_metadata.upsert({
      where: { 
        entity_type_entity_id: { entity_type: entityType, entity_id: BigInt(contentId) } 
      },
      update: data,
      create: { ...data, entity_type: entityType, entity_id: BigInt(contentId) },
    })
  }
}
