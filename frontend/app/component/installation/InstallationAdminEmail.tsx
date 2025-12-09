import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
export default function InstallationAdminEmail({
  onNext,
  onPrev,
}: {
  onNext: (email: string) => void;
  onPrev: () => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onNext(email);
  }

  return (
    <div>
      <Image
        className="mx-auto"
        src="/images/sf/logo_scrum_forge.png"
        alt="ScrumForge logo"
        width={200}
        height={200}
        loading="eager"
      />

      <div className="w-full max-w-3xl px-4">
        <section className="bg-slate-sf text-white p-6 rounded-md border border-[#ffffff15]">
          <h1 className="text-2xl pb-4">Setup Administrator account email</h1>
          <p className="text-[13px]">
            The Administrator role is <span className="font-bold text-amber-400">strictly technical.</span> <br />
            It is used to install and configure the ScrumForge instance, manage technical settings, and create other
            administrators or organization managers. <br />
            <span className="font-bold block pt-2 text-amber-400">
              Administrators do not participate in Scrum activities and cannot manage Teams, Products, Backlogs, or
              Sprints.
            </span>
          </p>
          <hr className="mt-4 text-[#ffffff1a]" />
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="admin-email" className="text-sm text-steel-sf">
                Administrator email
              </label>
              <input
                type="email"
                id="admin-email"
                aria-required="true"
                aria-invalid={!!error}
                className="w-full bg-charcoal-sf border border-[#ffffff1a] rounded-md px-3 py-2 text-sm
                        text-white placeholder:text-[#aaaaaa80]
                        focus:outline-none focus:ring-2 focus:ring-green-300/40"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>
        </section>

        <section className="mt-8 flex justify-around">
          <button
            className="p-2 bg-graphite-sf text-white hover:text-red-200 text-[13px] 
          border border-[#ffffff15] rounded-md hover:cursor-pointer flex justify-center items-center gap-2"
            onClick={onPrev}
          >
            <ArrowLeft size={16} /> Previous Step
          </button>
          <button
            className="p-2 bg-graphite-sf text-white hover:text-green-200 text-[13px] 
          border border-[#ffffff15] rounded-md hover:cursor-pointer flex justify-center items-center gap-2"
            onClick={() => handleSubmit(new Event("submit") as any)}
          >
            Next Step <ArrowRight size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}
