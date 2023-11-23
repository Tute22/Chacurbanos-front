import { LeftArrowIcon, TrashIcon, ChevronArrowDown } from "@/commons/icons";
import { poppins400, poppins500, poppins600, poppins700 } from "@/commons/fonts";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import box from "../../../public/box.png";
import { packages } from "../../services/packages.json";

export default function Packages() {

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

          <div>
            <h1 className="text-black font-bold mb-5">{packages.length} paquetes</h1>
          </div>

          <div className=" h-96 overflow-y-auto">
            {packages.map((element, index) => (
              <div key={index} className={`border border-solid border-black rounded-xl mb-4 `}>
                <div className="flex py-[10px] pl-[1px]">
                  <Image src={box} alt="box" width={50} />
                  <div className="flex-col border-l-2 border-black border-dotted">
                    <div className={`ml-2 ${poppins500.className}`}>
                      <h1 className={`text-[#55BBD1] ${poppins600.className} text-sm`}>{element.number_of_order}</h1>
                      <p className="text-sm text-black">{element.address.split(",")[0]},</p>
                      <p className="text-sm text-black">{element.address.split(",")[1]}</p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow items-end pr-3 mt-4">
                    <button>{<TrashIcon className="w-6 text-red" />}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button>{<ChevronArrowDown className="w-10 mt-6 text-black" />}</button>
          </div>
        </div>
      </main>
    </div>
  );
}
