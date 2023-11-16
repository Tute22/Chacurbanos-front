import Image from "next/image";
import pejoton from "../../../public/pejoton.png";
import { LogoutDoorIcon } from "@/commons/icons";

export default function Distribution() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
      <nav className="h-14 bg-[#AEE3EF] shadow-nav py-2 px-8 flex justify-between">
        <Image src={pejoton} width={56} height={160} alt="pejoton" />
        <div className="w-7 rounded-md my-[4px] bg-[#55BBD1] shadow-logout-button flex items-center justify-center">
          <LogoutDoorIcon className="w-6 ml-[3px]" />
        </div>
      </nav>
    </div>
  );
}
