import { Settings2 } from "lucide-react";
import { CircleArrowRight } from "lucide-react";
import { CircleArrowLeft } from "lucide-react";

export default function ManageUserFormFilter() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start gap-2.5">
        <Settings2 size={24} className="text-steel-sf hover:cursor-pointer hover:text-white" />
        <CircleArrowLeft size={24} className="text-steel-sf hover:cursor-pointer hover:text-white" />
        <CircleArrowRight size={24} className="text-steel-sf hover:cursor-pointer hover:text-white" />
      </div>
    </div>
  );
}
