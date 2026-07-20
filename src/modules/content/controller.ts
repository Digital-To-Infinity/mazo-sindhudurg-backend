import { Request, Response, NextFunction } from 'express'
import { ContentService } from './service'
import { sendSuccess } from '@/shared/response'
import { parsePagination } from '@/shared/pagination'

const service = new ContentService()

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = parsePagination(req.query)
    const { q, type, status } = req.query as Record<string, string>
    const result = await service.getAll({ q, type, status, page, limit })
    sendSuccess(res, result)
  } catch (err) { next(err) }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await service.getById(Number(req.params.id))
    sendSuccess(res, content)
  } catch (err) { next(err) }
}

export const getRelated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, exclude } = req.query as Record<string, string>
    const items = await service.getRelated(type, Number(exclude))
    sendSuccess(res, items)
  } catch (err) { next(err) }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await service.create(req.body)
    sendSuccess(res, content, 'Content created', 201)
  } catch (err) { next(err) }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await service.update(Number(req.params.id), req.body)
    sendSuccess(res, content, 'Content updated')
  } catch (err) { next(err) }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.delete(Number(req.params.id))
    sendSuccess(res, null, 'Content deleted')
  } catch (err) { next(err) }
}
