import { GetTeamMembersResult, Team } from "@/types/team.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";

export async function createTeam(name: string, description: string): Promise<{ team: Team }> {
  const res = await AxiosScrumForge.post<{ team: Team }>("/teams", { name, description }, { withCredentials: true });

  return res.data;
}

export async function getAllTeams(): Promise<{ teams: Team[] }> {
  const res = await AxiosScrumForge.get<{ teams: Team[] }>("/teams", {
    withCredentials: true,
  });

  return res.data;
}

export async function getTeamById(id: string): Promise<Team> {
  const res = await AxiosScrumForge.get<{ team: Team }>(`/teams/${id}`, {
    withCredentials: true,
  });
  return res.data.team;
}

export async function deleteTeam(id: string) {
  const res = await AxiosScrumForge.delete<{ success: boolean }>(`/teams/${id}`, { withCredentials: true });
  return res.data;
}

export async function updateTeam(id: string, team: { name?: string; description?: string }): Promise<Team> {
  const res = await AxiosScrumForge.patch<Team>(`/teams/${id}`, team, { withCredentials: true });
  return res.data;
}

export async function getTeamMember(id: string): Promise<GetTeamMembersResult> {
  const res = await AxiosScrumForge.get<GetTeamMembersResult>(`/teams/${id}/member`, { withCredentials: true });
  return res.data;
}

export async function addTeamMember(teamId: string, id: string): Promise<{ success: boolean }> {
  const res = await AxiosScrumForge.post<{ success: boolean }>(
    `/teams/${teamId}/member`,
    { id: id },
    { withCredentials: true }
  );
  return res.data;
}
