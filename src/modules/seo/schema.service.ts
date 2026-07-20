import { db } from '@/config/database'

/**
 * Generates JSON-LD schema markup for a given content item.
 */
export class SchemaService {
  async buildForContent(contentId: number) {
    const content = await db.content.findUnique({
      where: { id: contentId },
      include: { seo: true },
    })
    if (!content) return null

    const base = process.env.SITE_URL || 'http://localhost:3000'

    return {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: content.title,
      description: content.excerpt,
      url: `${base}/${content.slug}`,
      image: content.heroImage,
    }
  }
}
