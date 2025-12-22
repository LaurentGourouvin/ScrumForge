import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";

export function HandleGlobalError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        status: err.status,
        details: err?.details,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
}
