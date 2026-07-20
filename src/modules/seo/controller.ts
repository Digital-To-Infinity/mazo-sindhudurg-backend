import { Request, Response, NextFunction } from 'express'
import { SeoService } from './service'
import { sendSuccess } from '@/shared/response'

const service = new SeoService()

export const getByContentId = async (req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.getByContentId(Number(req.params.contentId))) } catch (err) { next(err) }
}

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seo = await service.upsert(Number(req.params.contentId), req.body)
    sendSuccess(res, seo, 'SEO data saved')
  } catch (err) { next(err) }
}
