import type { Request, Response, NextFunction } from 'express'
import { ZodType, ZodError } from 'zod'


export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          message: e.message,
          details: e.issues.map((issue) => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
          errors: e.flatten().fieldErrors,
        })
      }
      next(e)
    }
  }
}

export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)
      next()
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          message: e.message,
          details: e.issues.map((issue) => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
          errors: e.flatten().fieldErrors,
        })
      }
      next(e)
    }
  }
}

export const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)
      next()
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          message: e.message,
          details: e.issues.map((issue) => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
          errors: e.flatten().fieldErrors,
        })
      }
      next(e)
    }
  }
}
