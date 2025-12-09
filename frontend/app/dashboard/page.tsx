"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "../component/layout/DefaultLayout";
import { useAuth } from "@/app/hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <DefaultLayout
        topbarTitle="Dashboard"
        topbarSubtitle="Welcome back"
        topbarActions={
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/40 
                       text-red-300 rounded-md hover:bg-red-500/30 text-sm"
          >
            Logout
          </button>
        }
      >
        {/* Contenu du dashboard */}
        <div className="bg-slate-sf p-6 rounded-lg border border-[#2A2F36]">
          <h1 className="text-2xl text-white mb-4">Dashboard</h1>
          <div className="space-y-2 text-steel-sf text-sm">
            <p>Name: {user?.name || "N/A"}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
