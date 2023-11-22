import { LeftArrowIcon } from "@/commons/icons";
import { poppins700, poppins400 } from "@/commons/fonts";
import { Navbar } from "@/components/Navbar";

export default function Distribution() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <main className="mt-8 w-[335px] mx-auto bg-[#55BBD1] text-white rounded-xl">
        <div className="flex items-center w-full p-4">
          <LeftArrowIcon className="w-8 ml-[3px] absolute mx-auto" />

          <div className="w-fit mx-auto">
            <h3 className={`text-lg ${poppins700.className}`}>Paquetes</h3>
          </div>
        </div>

        <div className="p-4 bg-white rounded-[11px] shadow-white-distribution-container">
          <div className="flex">
            <div>
              <h1 className="text-black font-bold text-xl mb-1 mt-2">Enero</h1>
              <p className="border-dashed border-[#F4C455] border-t w-60"></p>
            </div>
            <div className={`flex flex-col items-center border border-solid border-[#F4C455] rounded-xl w-[42px] text-[#55BBD1] shadow-lg py-2 px-7`}>
              <h3 className={`text-lg ${poppins400.className}`}>mie</h3>
              <h1 className={`text-xl ${poppins700.className}`}>03</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
