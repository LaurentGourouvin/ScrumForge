import { Team } from "../../../prisma/generated/prisma/client";

export interface TeamsResult {
  teams: Team[];
  count: number;
}

export interface TeamResult {
  team: Team;
}

export interface TeamCreationPayload {
  name: string;
  description?: string;
}

export interface TeamUpdatePayload {
  id: string;
  name?: string;
  description?: string;
}
