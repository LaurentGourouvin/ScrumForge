import type { InstallationStatus, InstallationInput } from "@/types/installation.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";
import { AxiosResponse } from "axios";

export async function getInstallationStatus(): Promise<InstallationStatus> {
  const res = await AxiosScrumForge.get<InstallationStatus>("/installation/status");
  return res.data;
}

export async function completeInstallation(data: InstallationInput): Promise<AxiosResponse> {
  const res = await AxiosScrumForge.post("/installation/complete", data);
  return res;
}
