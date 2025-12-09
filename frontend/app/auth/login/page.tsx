"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 12) {
      setError("Password must be at least 12 characters.");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred during login.");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-charcoal-sf px-4">
      <div className="w-full max-w-md">
        <Image
          className="mx-auto mb-8"
          src="/images/sf/logo_scrum_forge.png"
          alt="ScrumForge logo"
          width={150}
          height={150}
          loading="eager"
        />

        <section className="bg-slate-sf text-white p-8 rounded-lg border border-[#ffffff15] shadow-xl">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-steel-sf text-sm mb-6">Sign in to your ScrumForge account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-steel-sf">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-charcoal-sf border border-[#ffffff1a] rounded-md px-3 py-2.5 text-sm
                        text-white placeholder:text-[#aaaaaa80]
                        focus:outline-none focus:ring-2 focus:ring-green-300/40
                        disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-steel-sf">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-charcoal-sf border border-[#ffffff1a] rounded-md px-3 py-2.5 text-sm
                        text-white placeholder:text-[#aaaaaa80]
                        focus:outline-none focus:ring-2 focus:ring-green-300/40
                        disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                aria-required="true"
                aria-invalid={!!error}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-graphite-sf text-white hover:text-green-200 text-sm font-medium
                      border border-[#ffffff15] rounded-md px-4 py-2.5
                      hover:cursor-pointer flex justify-center items-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-steel-sf text-xs">ScrumForge v1.0 - Self-hosted Scrum platform</p>
          </div>
        </section>
      </div>
    </main>
  );
}
