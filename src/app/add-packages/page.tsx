import { LeftArrowIcon } from '@/commons/icons';
import { Navbar } from '@/components/Navbar';
import { poppins400, poppins700 } from '@/commons/fonts';

export default function GetPackages() {
    return (
        <main className={`bg-[#AEE3EF] h-screen ${poppins400.className}`}>
            <Navbar />
            <section className="flex items-center flex-col h-[82%] mt-7">
                <div className="bg-[#55BBD1] rounded-lg p-4 w-80 h-[80px] text-white flex flex-wrap justify-between shadow-md">
                    <LeftArrowIcon className="w-8 ml-[3px] absolute mx-auto" />
                    <div className="w-fit mx-auto">
                        <h3 className={`text-lg ${poppins700.className} h-[32px] flex items-center`}>Agregar Paquetes</h3>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 w-80 mt-[-20px] h-[600px] flex flex-col shadow-md justify-center">
                    <div className="border border-solid border-black h-[40px] rounded-xl mt-4 flex items-center justify-center flex-row">
                        <input className="w-11/12 pl-2" placeholder="Dirección" />
                    </div>
                    <div className="border border-solid border-black h-[40px] rounded-xl mt-4 flex items-center justify-center flex-row">
                        <input className="w-11/12 pl-2" placeholder="Nombre de quien recibe" />
                    </div>
                    <div className="border border-solid border-black h-[40px] rounded-xl mt-4 flex items-center justify-center flex-row">
                        <input className="w-11/12 pl-2" placeholder="Peso del paquete (Kg)" />
                    </div>

                    <p className="mt-2 border-t border-1 border-dashed border-black"></p>

                    <p className="mt-3">Fecha de entrega</p>
                    <div className="border border-solid border-black h-[40px] rounded-xl mt-4 flex items-center justify-center flex-row">
                        <input type="date" className="w-11/12 pl-2" placeholder="00/00/00" />
                    </div>

                    <div className="mb-4 absolute right-12.3 bottom-[110px] flex justify-center">
                        <button type="submit" className={`w-72 py-1 font-bold bg-[#F4C455] rounded-full ${poppins400.className}`}>
                            Agregar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
