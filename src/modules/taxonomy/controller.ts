import { Request, Response, NextFunction } from 'express'
import { TaxonomyService } from './service'
import { sendSuccess } from '@/shared/response'

const service = new TaxonomyService()

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.getAll()) } catch (err) { next(err) }
}
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.getById(Number(req.params.id))) } catch (err) { next(err) }
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.create(req.body), 'Taxonomy created', 201) } catch (err) { next(err) }
}
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await service.update(Number(req.params.id), req.body), 'Taxonomy updated') } catch (err) { next(err) }
}
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try { await service.delete(Number(req.params.id)); sendSuccess(res, null, 'Taxonomy deleted') } catch (err) { next(err) }
}
