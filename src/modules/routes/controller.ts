import { Request, Response, NextFunction } from 'express'
import { RoutesService } from './service'
import { sendSuccess } from '@/shared/response'

const service = new RoutesService()

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const routes = await service.getAll()
    sendSuccess(res, routes)
  } catch (err) { next(err) }
}

export const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const route = await service.getBySlug(req.params.slug)
    sendSuccess(res, route)
  } catch (err) { next(err) }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const route = await service.create(req.body)
    sendSuccess(res, route, 'Route created', 201)
  } catch (err) { next(err) }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const route = await service.update(Number(req.params.id), req.body)
    sendSuccess(res, route, 'Route updated')
  } catch (err) { next(err) }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.delete(Number(req.params.id))
    sendSuccess(res, null, 'Route deleted')
  } catch (err) { next(err) }
}
