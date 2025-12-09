import { Loader2 } from "lucide-react";

export default function InstallationLoader() {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-sf border border-[#ffffff15] rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
        <Loader2 className="w-12 h-12 text-green-300 animate-spin" />
        <div className="text-center">
          <h3 className="text-white text-lg font-semibold mb-2">Creating your account...</h3>
          <p className="text-steel-sf text-sm">Setting up your ScrumForge instance</p>
        </div>
      </div>
    </div>
  );
}
