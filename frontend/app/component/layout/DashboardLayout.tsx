"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  topbarTitle: string;
  topbarSubtitle?: string;
  topbarActions?: ReactNode;
}

export default function DashboardLayout({
  children,
  topbarTitle,
  topbarSubtitle,
  topbarActions,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-charcoal-sf">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar title={topbarTitle} subtitle={topbarSubtitle} actions={topbarActions} />

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
