import Image from "next/image";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";
import { getPasswordValidationCheck } from "@/app/lib/password/PasswordValidator";

export default function InstallationAdminPassword({
  onPrev,
  onSave,
}: {
  onPrev: () => void;
  onSave: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const rules = getPasswordValidationCheck(password, confirmPasword);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!rules.isValid) {
      setError("Please fix the password requirements before continuing.");
      return;
    }

    onSave(password);
  }

  return (
    <div>
      <Image className="mx-auto" src="/images/sf/logo_scrum_forge.png" alt="ScrumForge logo" width={200} height={200} />

      <div className="w-full max-w-3xl px-4">
        <section className="bg-slate-sf text-white p-6 rounded-md border border-[#ffffff15]">
          <h1 className="text-2xl pb-4">Setup Administrator account password</h1>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-steel-sf">Administrator password</label>
              <input
                type="password"
                className="w-full bg-charcoal-sf border border-[#ffffff1a] rounded-md px-3 py-2 text-sm
                        text-white placeholder:text-[#aaaaaa80]
                        focus:outline-none focus:ring-2 focus:ring-green-300/40"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-steel-sf">Confirm password</label>
              <input
                type="password"
                className="w-full bg-charcoal-sf border border-[#ffffff1a] rounded-md px-3 py-2 text-sm
                        text-white placeholder:text-[#aaaaaa80]
                        focus:outline-none focus:ring-2 focus:ring-green-300/40"
                placeholder="Repeat the password"
                value={confirmPasword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

            <ul className="mt-4 p-3 rounded-md bg-[#111418] border border-[#ffffff1a] text-[13px] space-y-1">
              <PasswordRule ok={rules.matchesConfirm}>Password must match the confirmation.</PasswordRule>
              <PasswordRule ok={rules.hasMinLength}>Password must be at least 12 characters long.</PasswordRule>
              <PasswordRule ok={rules.hasSpecialChar}>
                Password must contain at least one special character.
              </PasswordRule>
              <PasswordRule ok={rules.hasUppercase}>Password must contain at least one uppercase letter.</PasswordRule>
              <PasswordRule ok={rules.hasLowercase}>Password must contain at least one lowercase letter.</PasswordRule>
            </ul>
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
            onClick={(e) => handleSubmit(e as any)}
          >
            Create account <CheckCircle size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}

function PasswordRule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-center gap-2 ${ok ? "text-green-300" : "text-red-300"}`}>
      {ok ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-60" />}
      <span>{children}</span>
    </li>
  );
}
