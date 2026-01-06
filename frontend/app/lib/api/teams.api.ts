import { Team } from "@/types/team.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";

export async function createTeam(name: string, description: string): Promise<{ team: Team }> {
  const res = await AxiosScrumForge.post<{ team: Team }>("/teams", { name, description }, { withCredentials: true });

  return res.data;
}
