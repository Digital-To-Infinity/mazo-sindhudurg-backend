import { Request, Response, NextFunction } from 'express'
import { db } from '@/config/database'
import { sendSuccess } from '@/shared/response'

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await db.site_settings.findMany()) } catch (err) { next(err) }
}

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, value, group = 'general' } = req.body
    const setting = await db.site_settings.upsert({
      where: { setting_group_setting_key: { setting_group: group, setting_key: key } },
      update: { setting_value: value },
      create: { setting_group: group, setting_key: key, setting_value: value },
    })
    sendSuccess(res, setting, 'Setting saved')
  } catch (err) { next(err) }
}
