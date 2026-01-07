import { z } from "zod";

export const create = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
  })
  .strict();

export const getTeamMember = z
  .object({
    id: z.uuid(),
  })
  .strict();

export const removeTeamMember = z
  .object({
    id: z.uuid(),
    memberId: z.uuid(),
  })
  .strict();
