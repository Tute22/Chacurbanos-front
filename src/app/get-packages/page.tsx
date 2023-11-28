import MainContainer from '@/commons/MainContainer';
import { CheckboxCheck } from '@/commons/icons/CheckboxCheck';
import { CheckboxEmpty } from '@/commons/icons/CheckboxEmpty';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export default function GetPackages() {
    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
            <Navbar />
            <MainContainer title={'Obtener Paquetes'} height="600px">
                <p className="text-[#55BBD1] text-center font-poppins font-normal text-sm">¿Cuántos paquetes repartirás hoy?</p>
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
            </MainContainer>
            <div className="mb-4 mt-10 flex justify-center">
                <Link href={'/working-day'}>
                    <button type="submit" className="w-80 py-1 bg-[#F4C455] rounded-full font-poppins font-bold">
                        Iniciar Jornada
                    </button>
                </Link>
            </div>
        </main>
    );
}