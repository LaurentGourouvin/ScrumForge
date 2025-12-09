import { ReactNode } from "react";

export interface DefaultLayoutProps {
  children: ReactNode;
  topbarTitle: string;
  topbarSubtitle?: string;
  topbarActions?: ReactNode;
}
