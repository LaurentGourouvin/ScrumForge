import { redirect } from "next/navigation";
import * as InstallationService from "@/app/lib/api/installation.api";
import { InstallationStatus } from "@/types/installation.type";

export default async function Home() {
  let installationState: InstallationStatus;

  try {
    installationState = await InstallationService.getInstallationStatus();
  } catch (error) {
    console.error(error);
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Application is not running.</h1>
      </main>
    );
  }

  if (!installationState.isInstalled) {
    redirect("/install");
  }

  redirect("/auth/login");
}
