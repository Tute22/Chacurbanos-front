import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { TriangleDownArrow } from "@/commons/icons";
import { TrashIcon } from "@/commons/icons";
import box from "../../../public/box.png";
import { poppins300, poppins400, poppins500, poppins600, poppins700, poppins800 } from "@/commons/fonts";

export default function WorkingDay() {
  return (
    <main className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <section className="bg-white w-80 h-[275px] mt-6 rounded-xl p-4 shadow-md">
          <div className={`flex justify-between items-center ${poppins800.className} text-lg mb-3.5`}>
            <div>Repartos pendientes</div>
            <TriangleDownArrow className="w-6 ml-[3px]" />
          </div>
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0A235</div>
                  <div className="text-sm">Amenabar 2100,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className={`mb-4 text-xs ${poppins700.className} bg-[#8AB2FF] py-0.5 px-4 rounded-l-2xl`}>EN CURSO</div>
                <div className="pr-3">
                  <TrashIcon className="w-6 text-red" />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0A235</div>
                  <div className="text-sm">Heredia 785,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className={`mb-4 text-xs ${poppins700.className} bg-[#232324] bg-opacity-20 py-0.5 px-3 rounded-l-2xl`}>PENDIENTE</div>
                <div className="pr-3">
                  <button className={`bg-[#F4C455] text-sm py-1 px-3 rounded-full ${poppins500.className}`}>Iniciar</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className="bg-white w-80 h-[300px] rounded-xl p-4 shadow-md">
          <div className={`flex justify-between items-center ${poppins800.className} text-lg mb-2`}>
            <div>Historial de reportes</div>
            <TriangleDownArrow className="w-6 ml-[3px]" />
          </div>
          <div className={`text-[#55BBD1] ${poppins300.className} text-sm mb-3`}>58 paquetes entregados</div>
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0A235</div>
                  <div className="text-sm">Gorriti 345,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}>ENTREGADO</div>
              </div>
            </div>
          </div>
          <br />
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div className={`text-[#55BBD1] ${poppins600.className} text-sm`}>#0A235</div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}>ENTREGADO</div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <div>
          <button className={`bg-[#F4C455] text-lg py-1 w-80 rounded-full ${poppins400.className}`}>Obtener paquetes</button>
        </div>
      </div>
    </main>
  );
}
