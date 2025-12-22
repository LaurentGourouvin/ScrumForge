import { ZodError, ZodType } from "zod";
import { AppError } from "../lib/appError";
import { Request, Response, NextFunction } from "express";

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message);
        return next(new AppError("VALIDATION_ERROR", 400, messages));
      }
      return next(error);
    }
  };
}

export function validateParams(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message);
        return next(new AppError("VALIDATION_ERROR", 400, messages));
      }
      return next(error);
    }
  };
}
