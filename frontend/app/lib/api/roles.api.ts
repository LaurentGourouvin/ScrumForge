import AxiosScrumForge from "../axios/AxiosScrumForge";

export async function getRoles(): Promise<string[]> {
  const res = await AxiosScrumForge.get<string[]>("/roles", {
    withCredentials: true,
  });
  return res.data;
}
