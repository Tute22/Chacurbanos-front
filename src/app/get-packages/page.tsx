"use client"
import MainContainer from '@/commons/MainContainer'
import { CheckboxCheck } from '@/commons/icons/CheckboxCheck'
import { CheckboxEmpty } from '@/commons/icons/CheckboxEmpty'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function GetPackages() {

    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT


    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${port}/users/${storedToken}`);
                const decodedToken = response.data.decodedToken;
                console.log('Token encontrado y decodificado:', decodedToken);
            } catch (err) {
                console.error(err);
                alert('Error al intentar obtener usuario.');
            }
        };

        if (storedToken) {
            fetchData();
        } else {
            router.push('/');
        }

    }, [port, router]);

    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
            <Navbar />
            <section className="flex items-center flex-col h-[82%] mt-2">
                <MainContainer title={'Obtener Paquetes'} height={'600px'}>
                    <p className="text-[#55BBD1] text-center font-poppins font-normal text-sm">
                        ¿Cuántos paquetes repartirás hoy?
                    </p>
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
            </section>

            <div className="mb-4 mt-5 flex justify-center">
                <Link href={'/working-day'}>
                    <button
                        type="submit"
                        className="w-80 py-1 bg-[#F4C455] rounded-full font-poppins font-bold"
                    >
                        Iniciar Jornada
                    </button>
                </Link>
            </div>
        </main>
    )
}
