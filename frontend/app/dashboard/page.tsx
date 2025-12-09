"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import { useAuth } from "@/app/hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-charcoal-sf p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-sf p-6 rounded-lg border border-[#ffffff15]">
            <h1 className="text-2xl text-white mb-4">Dashboard</h1>
            <div className="space-y-2 text-steel-sf">
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/40 
                   text-red-300 rounded-md hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
