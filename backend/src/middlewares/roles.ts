import { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/appError";
import { Role } from "../../prisma/generated/prisma/enums";

/**
 * RBAC Middleware - Restricts access based on user roles
 *
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @returns Express middleware function
 *
 * @example
 * router.post("/teams", authMiddleware, requireRole("ADMIN", "ORGANIZATION_MANAGER"), createTeamController);
 */
export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user?.role;

    if (!userRole) {
      return next(new AppError("UNAUTHORIZED", 401));
    }

    if (!allowedRoles.includes(userRole)) {
      return next(new AppError("FORBIDDEN", 403));
    }

    next();
  };
}
