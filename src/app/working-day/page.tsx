"use client"
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { TriangleDownArrow } from "@/commons/icons/TriangleDownArrow";
import { TrashIcon } from "@/commons/icons/TrashIcon";
import box from "../../../public/Box.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function WorkingDay() {

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
    <main className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <section className="bg-white w-80 h-[275px] mt-6 m-4 rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center font-poppins font-extrabold text-lg mb-3.5">
            <div>Repartos pendientes</div>
            <TriangleDownArrow className="w-6 ml-[3px]" />
          </div>
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className="ml-2 font-poppins font-medium">
                  <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                    #0A235
                  </div>
                  <div className="text-sm">Amenabar 2100,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className="mb-4 text-xs font-poppins font-bold bg-[#8AB2FF] py-0.5 px-4 rounded-l-2xl">
                  EN CURSO
                </div>
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
                <div className="ml-2 font-poppins font-medium">
                  <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                    #0A235
                  </div>
                  <div className="text-sm">Heredia 785,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className="mb-4 text-xs font-poppins font-bold bg-[#232324] bg-opacity-20 py-0.5 px-3 rounded-l-2xl">
                  PENDIENTE
                </div>
                <div className="pr-3">
                  <Link href={"/distribution"}>
                    <button className="bg-[#F4C455] text-sm py-1 px-3 rounded-full font-poppins font-medium">
                      Iniciar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section className="bg-white w-80 h-[300px] rounded-xl m-4 p-4 shadow-md">
          <div className="flex justify-between items-center font-poppins font-extrabold text-lg mb-2">
            <div>Historial de reportes</div>
            <TriangleDownArrow className="w-6 ml-[3px]" />
          </div>
          <div className="text-[#55BBD1] font-poppins font-light text-sm mb-3">
            58 paquetes entregados
          </div>
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className="ml-2 font-poppins font-medium">
                  <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                    #0A235
                  </div>
                  <div className="text-sm">Gorriti 345,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className="mb-4 text-xs font-poppins font-bold bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl">
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className={`border border-solid border-black rounded-xl`}>
            <div className="flex py-[10px] pl-[1px]">
              <Image src={box} alt="box" width={50} height={50} />
              <div className="flex-col border-l-2 border-black border-dotted">
                <div className="ml-2 font-poppins font-medium">
                  <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                    #0A235
                  </div>
                  <div className="text-sm">Malabia 789,</div>
                  <div className="text-sm">CABA</div>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-end">
                <div className="mb-4 text-xs font-poppins font-bold bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl">
                  ENTREGADO
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <div>
          <Link href={"/get-packages"}>
            <button className="bg-[#F4C455] text-lg py-1 w-80 rounded-full font-poppins font-medium mt-2">
              Obtener paquetes
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
