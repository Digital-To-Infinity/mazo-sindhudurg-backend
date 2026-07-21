import { Request, Response, NextFunction } from 'express'
import { getAllAuthors } from './service'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await getAllAuthors()
    res.json({
      success: true,
      data: authors
    })
  } catch (error) {
    next(error)
  }
}
