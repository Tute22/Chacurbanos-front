import Image from "next/image";
import pejoton from "../../../public/pejoton.png";
import { LogoutDoorIcon, LeftArrowIcon } from "@/commons/icons";
import { poppins800, poppins700, poppins200, poppins300, poppins400 } from "@/commons/fonts";

export default function Distribution() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
      <nav className="h-14 bg-[#AEE3EF] shadow-nav py-2 px-8 flex justify-between">
        <Image src={pejoton} width={56} height={160} alt="pejoton" />
        <div className="w-7 rounded-md my-[4px] bg-[#55BBD1] shadow-logout-button flex items-center justify-center">
          <LogoutDoorIcon className="w-6 ml-[3px]" />
        </div>
      </nav>

      {/* distribution screen */}

      <main className="mt-8 w-[335px] mx-auto bg-[#55BBD1] text-white   rounded-xl">
        <div className="flex items-center w-full p-4">
          <LeftArrowIcon className="w-8 ml-[3px] absolute mx-auto" />

          <div className="w-fit mx-auto">
            <h3 className={`text-lg ${poppins700.className}`}>Reparto en curso</h3>
          </div>
        </div>

        {/* Cuadrado blanco con mapa y datos de envío */}
        <div className="p-4 bg-white rounded-[11px] shadow-white-distribution-container">
          {/* Container para el MAPA  e info de envío*/}
          <div className="py-1 px-[0.5px]">
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52503.699211042076!2d-58.7351501216974!3d-34.66780282629255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf8707ca9e95%3A0x7a4b25f03463e529!2sSan%20Antonio%20de%20Padua%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700170849337!5m2!1ses-419!2sar"
              }
              className="h-[330px] w-full rounded-lg border border-slate-800"
              loading="lazy"
            ></iframe>

            {/* Container con info de envio  */}
            <div className="py-5 pl-[0.5px]">
              <p className={`text-black text-[13px] mb-[1px] ${poppins400.className}`}>
                <strong className={`${poppins700.className} font-bold`} >Destino:</strong> Balcarce 744
              </p>
              <p className={`text-black text-[13px] mb-[1px] ${poppins400.className}`}>
                <strong className={`${poppins700.className} font-bold`}>Número de paquete:</strong> #026AO9
              </p>
              <p className={`text-black text-[13px] ${poppins400.className}`}>
                <strong className={`${poppins700.className} font-bold`}>Recibe:</strong> David Rodríguez
              </p>
            </div>

            {/* Container para botones */}
            <div className="pt-2">
              <button className={`w-full bg-amber-400 text-stone-900 rounded-3xl py-[6px] text-base ${poppins400.className}`}>
                Finalizar
              </button>
              <button className={`w-full mt-[14px] border border-amber-400 text-stone-900 rounded-3xl py-[6px] text-base ${poppins400.className}`}>
                Cancelar entrega
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
