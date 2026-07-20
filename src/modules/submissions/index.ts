import { Request, Response, NextFunction } from 'express'
import { db } from '@/config/database'
import { sendSuccess } from '@/shared/response'

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try { sendSuccess(res, await db.submission.findMany({ orderBy: { createdAt: 'desc' } })) } catch (err) { next(err) }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submission = await db.submission.create({ data: req.body })
    sendSuccess(res, submission, 'Submission received', 201)
  } catch (err) { next(err) }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await db.submission.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status },
    })
    sendSuccess(res, updated, 'Status updated')
  } catch (err) { next(err) }
}
