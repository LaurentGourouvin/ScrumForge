export type InstallationStatus = {
  isInstalled: boolean;
  instanceName: string | null;
};

export type InstallationInput = {
  adminEmail: string;
  adminPassword: string;
  instanceName?: string | null;
};
