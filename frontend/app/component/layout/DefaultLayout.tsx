"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { DefaultLayoutProps } from "@/types/defaultLayout";

export default function DefaultLayout({ children, topbarTitle, topbarSubtitle, topbarActions }: DefaultLayoutProps) {
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
