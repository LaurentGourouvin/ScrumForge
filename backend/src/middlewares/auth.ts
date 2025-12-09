import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth.utils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = verifyToken(token);

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
