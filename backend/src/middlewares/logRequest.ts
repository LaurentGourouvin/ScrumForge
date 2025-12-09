import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export function logRequests(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });

  next();
}
