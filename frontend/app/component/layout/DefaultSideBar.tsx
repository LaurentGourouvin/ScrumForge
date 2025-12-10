import { usePathname } from "next/navigation";
import Link from "next/link";
export default function DefaultSideBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex-1 overflow-y-auto">
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
  );
}
