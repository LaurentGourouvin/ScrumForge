import Image from "next/image";
import { Rocket, SwordsIcon } from "lucide-react";

export default function InstallationGreetings({ onNext }: { onNext: () => void }) {
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
          <h1 className="text-2xl pb-4">
            Welcome to the <span className="[text-shadow:0_0_6px_rgba(0,0,0,0.45)] text-[#2B3E42FF]">Scrum</span>
            <span className="[text-shadow:0_0_6px_rgba(0,0,0,0.45)] text-[#35728BFD]">Forge</span> Setup Wizard.
          </h1>
          <p className="text-[13px]">
            We're excited to help you get your workspace up and running. <br />
            Follow the steps, create your admin account, and let’s get your ScrumForge instance ready to launch. <br />
            Your journey to a smoother, smarter project workflow starts here.
          </p>

          <p className="mt-4 italic text-right text-steel-sf flex gap-2 justify-end items-center">
            The ScrumForge Team <SwordsIcon size={16} />
          </p>
        </section>

        <section className="mt-8 flex justify-end">
          <button
            className="p-2 bg-graphite-sf text-white hover:text-green-200 text-[13px] 
          border border-[#ffffff15] rounded-md hover:cursor-pointer flex justify-center items-center gap-2"
            onClick={onNext}
          >
            Start installation <Rocket size={16} />
          </button>
        </section>
      </div>
    </div>
  );
}
