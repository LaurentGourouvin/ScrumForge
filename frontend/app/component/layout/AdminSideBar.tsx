import { usePathname } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Users } from "lucide-react";
import { Contact } from "lucide-react";
import { Layers } from "lucide-react";

export default function AdminSideBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex-1 overflow-y-auto">
      <nav>
        <Link
          href="/dashboard"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/dashboard") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Dashboard
        </Link>
      </nav>

      <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf flex items-center gap-1.5">
        <Building2 size={16} />
        Organization
      </div>
      <nav>
        <Link
          href="#"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/product/create")
              ? "bg-[#20252c] text-white"
              : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Create organization
        </Link>
      </nav>

      <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf flex gap-1.5 content-center">
        <Contact size={16} />
        Users
      </div>
      <nav>
        <Link
          href="#"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/user/create") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Create user
        </Link>
        <Link
          href="/#"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/user/manage") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Manage users
        </Link>
      </nav>

      <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf flex gap-1.5 items-center">
        <Users size={16} />
        Teams
      </div>
      <nav>
        <Link
          href="#"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/team/create") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Create Team
        </Link>
        <Link
          href="/teams"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/team/manage") ? "bg-[#20252c] text-white" : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Manage Teams
        </Link>
      </nav>

      <div className="px-5 pt-3 pb-1 text-[11px] uppercase tracking-wider text-steel-sf flex gap-1.5 content-center">
        <Layers size={16} />
        Products
      </div>
      <nav>
        <Link
          href="#"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/product/create")
              ? "bg-[#20252c] text-white"
              : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Create Product
        </Link>
        <Link
          href="/teams"
          className={`block px-5 py-2 text-sm transition-colors ${
            isActive("/product/manage")
              ? "bg-[#20252c] text-white"
              : "text-steel-sf hover:bg-[#20252c] hover:text-white"
          }`}
        >
          Manage Products
        </Link>
      </nav>
    </div>
  );
}
