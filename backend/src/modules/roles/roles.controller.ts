import { Request, Response } from "express";
import * as RolesService from "./roles.service";

export async function getAllRolesController(req: Request, res: Response) {
  try {
    const roles = RolesService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
