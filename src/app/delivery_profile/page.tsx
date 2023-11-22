import { LeftArrowIcon, TriangleDownArrow } from "@/commons/icons";
import { poppins700, poppins400, poppins600 } from "@/commons/fonts";
import { Navbar } from "@/components/Navbar";
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
            <div className="pl-2 flex justify-between w-64 items-center">
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

      <div className="p-4 w-[335px] mx-auto mt-3 bg-white rounded-[11px] shadow-white-distribution-container ">
        <div className="w-full" >
          <div className="flex justify-between " >
            <h3 className={`text-lg ${poppins700.className}`}>
              Repartos pendientes
            </h3>
            <TriangleDownArrow className=" w-[18px] h-6  ml-[3px] -rotate-90"/>
          </div>
          <p className="mt-1 text-[15px]">Sin repartos</p>
        </div>
      </div>
    </div>
  );
}
