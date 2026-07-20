import { MediaRepository } from './repository'
import { uploadToCloudinary } from '@/integrations/cloudinary/upload'
import { destroyFromCloudinary } from '@/integrations/cloudinary/destroy'
import { NotFoundError } from '@/shared/errors'

const repo = new MediaRepository()

export class MediaService {
  getAll() { return repo.findAll() }

  async upload(file: Express.Multer.File, meta: { altText?: string }) {
    const result = await uploadToCloudinary(file.buffer, {
      folder: 'mazo-sindhudurg',
      resource_type: 'image',
    })

    return repo.create({
      url: result.secure_url,
      publicId: result.public_id,
      altText: meta.altText,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    })
  }

  async delete(id: number) {
    const media = await repo.findById(id)
    if (!media) throw new NotFoundError('Media not found')
    await destroyFromCloudinary(media.publicId)
    return repo.delete(id)
  }
}
