"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-slate-sf border-r border-[#2A2F36] flex flex-col h-screen">
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-[#2A2F36]">
        <div className="text-lg font-semibold text-white mx-auto flex items-center">
          <Image src="/images/sf/logo_scrum_forge.png" alt="ScrumForge Logo" width={90} height={90} loading="eager" />
          ScrumForge
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Workspace Section */}
        <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf">Workspace</div>
        <nav>
          <Link
            href="/dashboard"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/dashboard") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/teams"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/teams") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Teams
          </Link>
        </nav>

        {/* Product Section */}
        <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf">Product</div>
        <nav>
          <Link
            href="/products"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/products") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Overview
          </Link>
          <Link
            href="/backlog"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/backlog") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Backlog
          </Link>
          <Link
            href="/sprint"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/sprint") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Sprint
          </Link>
          <Link
            href="/reports"
            className={`block px-5 py-2 text-sm transition-colors ${
              isActive("/reports") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
            }`}
          >
            Reports
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#2A2F36] text-xs text-steel-sf">
        <div>Signed in as</div>
        <div className="font-semibold text-white mt-1">
          {user?.name || user?.email} ({user?.role})
        </div>
      </div>
    </aside>
  );
}
