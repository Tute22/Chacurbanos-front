import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { TriangleDownArrow } from "@/commons/icons";
import { TrashIcon } from "@/commons/icons";
import box from "../../../public/box.png";
import { poppins500, poppins600, poppins700, poppins800 } from "@/commons/fonts";

export default function WorkingDay() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
        <Navbar/>
        <div className="flex justify-center">
            <div className="bg-white p-4 w-80 h-72 m-6 rounded-xl">
                <div className={`flex justify-between items-center ${poppins800.className} text-lg mb-3.5`} >
                   <div>Repartos pendientes</div>
                   <TriangleDownArrow className="w-6 ml-[3px]"/>
                </div>
                <div className={`border border-solid border-black rounded-xl flex ${poppins500.className} py-3`}>
                  <div className="flex-grow">
                    <div className="flex justify-center items-center">
                      <Image src={box} alt="box" width={50} height={50} className="flex justify-center items-center p-0.5" />
                      <div className="flex-col border-l-2 border-black border-dotted">
                        <div className="ml-2">
                          <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0A235</div>
                          <div className="text-sm">Amenabar 2100,</div>
                          <div className="text-sm">CABA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow items-end">
                    <div className={`mb-4 text-xs ${poppins700.className} bg-[#8AB2FF] py-0.5 px-4 rounded-l-2xl`}>EN CURSO</div>
                    <div className="pr-3">
                      <TrashIcon className="w-6 text-red"/>
                    </div>
                  </div>
                </div>
                <br/>
                <div className={`border border-solid border-black rounded-xl flex ${poppins500.className} py-3`}>
                  <div className="flex-grow">
                    <div className="flex justify-center items-center">
                      <Image src={box} alt="box" width={50} height={50} className="flex justify-center items-center p-0.5" />
                      <div className="flex-col border-l-2 border-black border-dotted">
                        <div className="ml-2">
                          <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0G370</div>
                          <div className="text-sm">Heredia 785,</div>
                          <div className="text-sm">CABA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow items-end">
                    <div className={`mb-4 text-xs ${poppins700.className} bg-[#232324] bg-opacity-20 py-0.5 px-4 rounded-l-2xl`}>PENDIENTE</div>
                    <div className="pr-3">
                      {/* Boton Iniciar */}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
}