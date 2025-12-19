import { Request, Response } from "express";
import * as UsersService from "./users.service";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UsersService.getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function getUserById(req: Request, res: Response) {
  const id = req.params.id || "";
  try {
    const user = await UsersService.getUserById(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function getUsersByTeamId(req: Request, res: Response) {
  const teamId = req.params.id || "";
  try {
    const users = await UsersService.getUsersByTeamId(teamId);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function createUser(req: Request, res: Response) {
  const { email, password, name, role } = req.body;
  try {
    const user = await UsersService.create({ email, password, name, role });
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function updateCurrentUser(req: Request, res: Response) {
  const { email, name, newPassword } = req.body;
  const id = res.locals?.user.id;

  try {
    const user = await UsersService.updateCurrentUser({ id, email, name, newPassword });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id || "";
  const { email, name, role, newPassword } = req.body;
  try {
    const user = await UsersService.update({ id, email, name, role, newPassword });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id || "";
  try {
    const user = await UsersService.deleteUser(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.status || 500).json(error.message || "Internal server error");
  }
}
