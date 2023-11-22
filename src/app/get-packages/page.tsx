import { CheckboxCheck, CheckboxEmpty, LeftArrowIcon } from '@/commons/icons';
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
                        <h3 className={`text-lg ${poppins700.className} h-[32px] flex items-center`}>Obtener Paquetes</h3>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 w-80 mt-[-20px] h-[600px] flex flex-col shadow-md">
                    <p className={`text-[#55BBD1] text-center ${poppins400.className} text-sm`}>¿Cuántos paquetes repartirás hoy?</p>
                    <p className="mt-2 border-t border-1 border-dashed border-black"></p>

                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxCheck className="w-6 ml-4 h-fit fill-[#AEE3EF]" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Amenabar 2100,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxCheck className="w-6 ml-4 h-fit fill-[#AEE3EF]" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Av Carabobo y Rivadavia,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxCheck className="w-6 ml-4 h-fit fill-[#AEE3EF]" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Melian 1242,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Castillo 670,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Gorriti 4595,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Av. Gral. Mosconi 1056,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                    <div className="border border-solid border-black h-[60px] rounded-xl mt-4 flex items-center flex-row">
                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                        <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                        <div className="ml-4 text-xs">
                            <p>Tacuari 1797,</p>
                            <p>CABA</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mb-4 flex justify-center">
                <button type="submit" className={` w-80 py-1 font-bold bg-[#F4C455] rounded-full ${poppins400.className}`}>
                    Iniciar Jornada
                </button>
            </div>
        </main>
    );
}
