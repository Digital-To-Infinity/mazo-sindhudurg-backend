import { Request, Response, NextFunction } from 'express'
import { MediaService } from './service'
import { sendSuccess } from '@/shared/response'

const service = new MediaService()

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.getAll()) } catch (err) { next(err) }
}

export const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new Error('No file provided')
    const media = await service.upload(req.file, req.body)
    sendSuccess(res, media, 'Media uploaded', 201)
  } catch (err) { next(err) }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.delete(Number(req.params.id))
    sendSuccess(res, null, 'Media deleted')
  } catch (err) { next(err) }
}
