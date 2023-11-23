import { LeftArrowIcon, TriangleDownArrow } from "@/commons/icons";
import {
  poppins700,
  poppins400,
  poppins600,
  poppins500,
} from "@/commons/fonts";
import { Navbar } from "@/components/Navbar";
import box from "../../../public/Box.png";
import exampleFace from "../../../public/Ellipse 9.png";
import Image from "next/image";

export default function AdminProfile() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
      <Navbar />

      <main className="mt-8 w-[335px] mx-auto bg-[#55BBD1] text-white   rounded-xl">
        <div className="flex items-center w-full p-4">
          <LeftArrowIcon className="w-8 ml-[3px] absolute mx-auto" />

          <div className="w-fit mx-auto">
            <h3 className={`text-lg ${poppins700.className}`}>
              Perfil del repartidor
            </h3>
          </div>
        </div>

        {/* Cuadrado blanco con mapa y datos de envío */}
        <div className="p-4 bg-white rounded-[11px] shadow-white-distribution-container ">
          {/* Container con imagen de perfil, nombre, estado y toggle*/}
          <div className="flex items-center">
            <Image src={exampleFace} alt="example_face" className="w-[70px]" />

            {/* Container con nombre, estado y toggle */}
            <div className="pl-2 flex justify-between w-64 items-center ml-1">
              {/* Container con nombre y estado */}
              <div>
                <p
                  className={`text-black text-[13px] mb-[3px] ml-[0.5px] ${poppins400.className}`}
                >
                  <strong
                    className={`${poppins700.className} font-bold text-base`}
                  >
                    Farid
                  </strong>
                </p>

                <div
                  className={`mb-1 text-[10px] text-black ${poppins700.className} bg-[#8EEE86] py-[1px] px-3 rounded-2xl tracking-wide`}
                >
                  HABILITADO
                </div>
              </div>

              {/* Container con toggle */}
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 border-[1px] border-solid border-[#55BBD1] peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] before:start-[2px] after:start-[2px] after:border-gray-300 after:border after:rounded-full after:bg-[#F4C455] after:h-5 after:w-5 after:transition-all ring:[#F4C455]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Container con info de repartos pendientes */}
      <div className="p-4 w-[335px] mx-auto mt-3 bg-white rounded-[11px] shadow-white-distribution-container ">
        <div className="w-full">
          <div className="flex justify-between ">
            <h3 className={`text-lg ${poppins700.className}`}>
              Repartos pendientes
            </h3>
            <TriangleDownArrow className=" w-[18px] h-6  ml-[3px] -rotate-90" />
          </div>
          <p className={`mt-1 text-[13px] ${poppins400.className}`}>
            Sin repartos
          </p>
        </div>
      </div>

      

        

        <div className="p-4 w-[335px] mx-auto mt-3 bg-white rounded-[11px] shadow-white-distribution-container max-h-[385.5px] " >
        <div className="w-full">
          <div className="flex justify-between ">
            <h3 className={`text-lg ${poppins700.className}`}>
              Historial de repartos
            </h3>
            <TriangleDownArrow className=" w-[18px] h-6  ml-[3px] " />
          </div>
          <p className={`mt-1 text-[13px] ${poppins400.className} mb-5`}>
            58 paquetes entregados
          </p>
        </div>
        {/* Containers de paquetes entregados */}
        <main className="max-h-[280.5px] scroll-content ">
          <div className={`border border-solid border-black rounded-xl mb-3 `}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div
                    className={`text-[#55BBD1] ${poppins600.className} text-sm`}
                  >
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div
                  className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}
                >
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>

          <div className={`border border-solid border-black rounded-xl mb-3`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div
                    className={`text-[#55BBD1] ${poppins600.className} text-sm`}
                  >
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div
                  className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}
                >
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>

          <div className={`border border-solid border-black rounded-xl mb-3`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div
                    className={`text-[#55BBD1] ${poppins600.className} text-sm`}
                  >
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div
                  className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}
                >
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>

          <div className={`border border-solid border-black rounded-xl mb-3`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div
                    className={`text-[#55BBD1] ${poppins600.className} text-sm`}
                  >
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div
                  className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}
                >
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>

          <div className={`border border-solid border-black rounded-xl mb-3`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className={`ml-2 ${poppins500.className}`}>
                  <div
                    className={`text-[#55BBD1] ${poppins600.className} text-sm`}
                  >
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div
                  className={`mb-4 text-xs ${poppins700.className} bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl`}
                >
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
