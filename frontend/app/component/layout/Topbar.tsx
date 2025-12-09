"use client";

import { ReactNode } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="h-12 border-b border-[#2A2F36] flex items-center justify-between px-5 bg-charcoal-sf">
      {/* Context */}
      <div className="flex flex-col">
        <div className="text-sm text-steel-sf">{title}</div>
        {subtitle && <div className="text-xs text-steel-sf">{subtitle}</div>}
      </div>

      {/* Actions */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
