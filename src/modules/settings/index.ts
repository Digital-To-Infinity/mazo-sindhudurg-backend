import { Request, Response, NextFunction } from 'express'
import { db } from '@/config/database'
import { sendSuccess } from '@/shared/response'

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await db.setting.findMany()) } catch (err) { next(err) }
}

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, value } = req.body
    const setting = await db.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    sendSuccess(res, setting, 'Setting saved')
  } catch (err) { next(err) }
}
