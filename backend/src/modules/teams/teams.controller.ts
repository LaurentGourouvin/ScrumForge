import { Request, Response } from "express";
import * as TeamsService from "./teams.service";

export async function getAllTeamController(req: Request, res: Response) {
  try {
    const teams = await TeamsService.getAllTeams();

    return res.status(200).json(teams);
  } catch (error: any) {
    return res.status(error.status || 500).json({
      error: error.message || "Internal server error",
    });
  }
}

export async function getTeamByIdController(req: Request, res: Response) {
  const id = req.params.id || "";

  try {
    const team = await TeamsService.getTeamById(id);
    return res.status(200).json(team);
  } catch (error: any) {
    return res.status(error.status || 500).json({
      error: error.message || "Internal server error",
    });
  }
}

export async function createTeamController(req: Request, res: Response) {
  const { name, description } = req.body;

  try {
    const teamCreated = await TeamsService.createTeam({ name, description });
    return res.status(201).json(teamCreated);
  } catch (error: any) {
    return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
}

export async function updateTeamController(req: Request, res: Response) {
  const { name, description } = req.body;
  const id = req.params.id || "";

  try {
    const updateTeam = await TeamsService.updateTeam({ id, name, description });
    return res.status(200).json(updateTeam);
  } catch (error: any) {
    return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
}

export async function deleteTeamController(req: Request, res: Response) {
  const id = req.params.id || "";

  try {
    const deleteTeam = await TeamsService.deleteTeam(id);
    return res.status(200).json(deleteTeam);
  } catch (error: any) {
    return res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
}
