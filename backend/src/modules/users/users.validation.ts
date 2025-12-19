import { z } from "zod";
import { Role } from "../../../prisma/generated/prisma/enums";

export const create = z
  .object({
    email: z.email("Invalid email format"),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[!@#$%^&*(),.?":{}|<>_\-+=;/'\[\]\\]/, "Password must contain at least one special character"),
    role: z.enum([Role.ADMIN, Role.ORGANIZATION_MANAGER, Role.PRODUCT_OWNER, Role.SCRUM_MASTER, Role.DEVELOPER]),
    name: z.string().min(1, "Name is required"),
  })
  .strict();

export const updateCurrent = z
  .object({
    email: z.email("Invalid email format").optional(),
    name: z.string().min(1, "Name is required").optional(),
  })
  .strict();

export const updateCurrentPassword = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(12, "Password must be at least 12 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[!@#$%^&*(),.?":{}|<>_\-+=;/'\[\]\\]/, "Password must contain at least one special character"),
  })
  .strict();
