import { redirect } from "next/navigation";
import * as InstallationService from "@/app/lib/api/installation.api";
import type { InstallationStatus } from "@/types/installation.type";
import Installation from "../component/installation/Installation";

export default async function InstallPage() {
  let installationState: InstallationStatus;

  try {
    installationState = await InstallationService.getInstallationStatus();
  } catch (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Application is not running.</h1>
      </main>
    );
  }

  if (installationState.isInstalled) {
    redirect("/auth/login");
  }

  return <Installation />;
}
