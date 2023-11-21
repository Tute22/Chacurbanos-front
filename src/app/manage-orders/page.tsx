import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import adminLogo from "../../../public/adminFoto.png";
import delivery1 from "../../../public/delivery1.png";
import delivery2 from "../../../public/delivery2.png";
import { poppins300, poppins400, poppins500, poppins600, poppins700 } from "@/commons/fonts";
import { TriangleDownArrow, PlusIcon } from "@/commons/icons";
import { Progress } from "antd";

export default function ManageOrders() {
  return (
    <div className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <section className="flex justify-center mt-9">
        <section className="bg-[#55BBD1] h-[150px] rounded-xl">
          <div className="flex justify-center gap-12 mt-3 mb-2">
            <h1 className={`text-lg ${poppins700.className} text-white`}>Gestionar pedidos</h1>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-5 w-80 h-[600px]">
            <div className="flex">
              <Image src={adminLogo} alt="Admin Logo" width={57} />
              <div className="flex flex-col ml-[20px]">
                <h1 className={`text-base ${poppins700.className}`}>¡Hola Admin!</h1>
                <h3 className={`text-sm ${poppins300.className}`}>Estos son los pedidos del día</h3>
              </div>
            </div>
            <br />
            <div className={`flex flex-col items-center border border-solid border-black rounded-xl`}>
              <h1 className={`text-base ${poppins700.className} border-b-2 border-[#55BBD1] border-dotted w-[250px] mt-1`}>Enero</h1>
              <div>
                <div className="flex my-2">
                  <TriangleDownArrow className="rotate-90 w-[20px]" />
                  <div className={`flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5`}>
                    <h3 className={`text-lg ${poppins400.className}`}>lun</h3>
                    <h1 className={`text-xl ${poppins700.className}`}>01</h1>
                  </div>
                  <div className={`flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5`}>
                    <h3 className={`text-lg ${poppins400.className}`}>mar</h3>
                    <h1 className={`text-xl ${poppins700.className}`}>02</h1>
                  </div>
                  <div className={`flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5 bg-[#F4C455]`}>
                    <h3 className={`text-lg ${poppins400.className}`}>mie</h3>
                    <h1 className={`text-xl ${poppins700.className}`}>03</h1>
                  </div>
                  <div className={`flex flex-col items-center border rounded-xl w-[42px] m-0.5 bg-[#626262] bg-opacity-[20%]`}>
                    <h3 className={`text-lg ${poppins400.className} text-[#626262]`}>jue</h3>
                    <h1 className={`text-xl ${poppins700.className} text-[#626262]`}>04</h1>
                  </div>
                  <div className={`flex flex-col items-center border rounded-xl w-[42px] m-0.5 bg-[#626262] bg-opacity-[20%]`}>
                    <h3 className={`text-lg ${poppins400.className} text-[#626262]`}>vie</h3>
                    <h1 className={`text-xl ${poppins700.className} text-[#626262]`}>05</h1>
                  </div>
                  <TriangleDownArrow className="rotate-[-90deg] w-[20px]" />
                </div>
              </div>
            </div>
            <br />
            <div className={`flex flex-col items-center border border-solid border-black rounded-xl`}>
              <div className="flex justify-between border-b-2 border-[#55BBD1] border-dotted w-[250px] mb-2">
                <h1 className={`text-base ${poppins700.className} mt-1`}>Detalles</h1>
                <div className="flex">
                  <h2 className={`text-base ${poppins500.className} mt-1`}>03/01/23</h2>
                  <TriangleDownArrow className="w-[20px] ml-1" />
                </div>
              </div>
              <div className="flex  justify-between w-[250px] mb-5">
                <Progress type="circle" percent={20} strokeColor="#55BBD1" size={70} className={`text-lg ${poppins600.className}`} />
                <div>
                  <h1 className={`text-sm ${poppins700.className}`}>Repartidores</h1>
                  <h3 className={`text-xs ${poppins300.className}`}>2/10 Habilitados</h3>
                  <div className="flex">
                    {" "}
                    <Image src={delivery1} alt="Delivery 1 Logo" width={30} />
                    <Image src={delivery2} alt="Delivery 2 Logo" width={30} />
                  </div>
                </div>
                <button className={`bg-[#F4C455] text-sm py-1 px-3 rounded-full h-[28px] mt-[37px] ${poppins500.className}`}>Ver</button>
              </div>
              <div className="flex justify-between border-b-2 border-[#55BBD1] border-dotted w-[250px] mb-2"></div>
              <div className="flex  justify-between w-[250px] mb-5">
                <Progress type="circle" percent={80} strokeColor="#55BBD1" size={70} className={`text-lg ${poppins600.className}`} />
                <div>
                  <h1 className={`text-sm ${poppins700.className}`}>Paquetes</h1>
                  <h3 className={`text-xs ${poppins300.className}`}>16/20 Repartidos</h3>
                  <div className="flex">
                    {" "}
                    <Image src={delivery1} alt="Delivery 1 Logo" width={30} />
                    <Image src={delivery2} alt="Delivery 2 Logo" width={30} />
                    <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#55BBD1] rounded-full">
                      <h1 className={`text-[12px] text-white ${poppins600.className}`}>+14</h1>
                    </div>
                  </div>
                </div>
                <button className={`bg-[#F4C455] text-sm py-1 px-3 rounded-full h-[28px] mt-[37px] ${poppins500.className}`}>Ver</button>
              </div>
            </div>
            <br />
            <div>
              <button className={`bg-[#F4C455] text-lg py-1 w-[280px] rounded-full ${poppins400.className}`}>
                <div className="flex justify-center items-center">
                  <h1 className="mr-2">Nuevo paquete</h1>
                  <PlusIcon className="w-[20px]" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
