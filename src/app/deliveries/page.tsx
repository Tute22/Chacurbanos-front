import { poppins400, poppins600, poppins700 } from "@/commons/fonts";
import { ChevronArrowDown, LeftArrowIcon } from "@/commons/icons";
import { Navbar } from "@/components/Navbar";
import { Progress } from "antd";
import Image from "next/image";
import delivery3 from "../../../public/delivery3.svg";
import delivery4 from "../../../public/delivery4.svg";
import delivery5 from "../../../public/delivery5.svg";
import delivery6 from "../../../public/delivery6.svg";

export default function Deliveries() {
  return (
    <main className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <section className="flex justify-center mt-9">
        <section className="bg-[#55BBD1] h-[150px] rounded-xl">
          <div className="flex gap-16 mt-3 mb-2">
            <LeftArrowIcon className="w-8 h-auto text-white ml-3" />
            <h1
              className={`flex justify-center text-lg ${poppins700.className} text-white`}
            >
              Repartidores
            </h1>
          </div>
          <section className="bg-white rounded-xl shadow-xl p-5 w-80 h-[600px]">
            <div className="flex">
              <div>
                <h1
                  className={`text-black font-bold text-xl mb-1 mt-2 ${poppins700.className}`}
                >
                  Enero
                </h1>
                <p className="border-dashed border-[#F4C455] border-t w-56"></p>
              </div>
              <div
                className={`flex flex-col items-center border border-solid border-[#F4C455] rounded-xl w-[42px] text-[#55BBD1] shadow-lg py-2 px-7`}
              >
                <h3 className={`text-lg ${poppins400.className}`}>mie</h3>
                <h1 className={`text-xl ${poppins700.className}`}>03</h1>
              </div>
            </div>

            <div className="flex gap-5">
              <Progress
                type="circle"
                percent={52}
                strokeColor="#55BBD1"
                size={70}
                className={`text-lg ${poppins600.className}`}
              ></Progress>
              <div>
                <h2 className={`mt-3 text-lg ${poppins700.className}`}>
                  Farid
                </h2>
                <h3
                  className={`text-xs bg-[#F4C455] px-2 rounded-full ${poppins700.className}`}
                >
                  EN CURSO
                </h3>
              </div>
              <Image src={delivery3} alt="delivery" className="ml-12" />
            </div>
            <p className="my-5 border-dashed border-black border-t w-full"></p>
            <div className="flex gap-5">
              <Progress
                type="circle"
                percent={100}
                strokeColor="#55BBD1"
                size={70}
                className={`text-lg ${poppins600.className}`}
              ></Progress>
              <div>
                <h2 className={`mt-3 text-lg ${poppins700.className}`}>
                  Luciana
                </h2>
                <h3
                  className={`text-xs bg-[#8EEE86] px-2 rounded-full ${poppins700.className}`}
                >
                  ENTREGADO
                </h3>
              </div>
              <Image src={delivery5} alt="delivery" className="ml-9" />
            </div>
            <p className="my-5 border-dashed border-black border-t w-full"></p>
            <div className="flex gap-5">
              <Progress
                type="circle"
                percent={80}
                strokeColor="#55BBD1"
                size={70}
                className={`text-lg ${poppins600.className}`}
              ></Progress>
              <div>
                <h2 className={`mt-3 text-lg ${poppins700.className}`}>
                  Dario
                </h2>
                <h3
                  className={`text-xs bg-[#F4C455] px-2 rounded-full ${poppins700.className}`}
                >
                  EN CURSO
                </h3>
              </div>
              <Image src={delivery6} alt="delivery" className="ml-12" />
            </div>
            <p className="my-5 border-dashed border-black border-t w-full"></p>
            <div className="flex gap-5">
              <Progress
                type="circle"
                percent={0}
                strokeColor="#55BBD1"
                size={70}
                className={`text-lg ${poppins600.className}`}
              ></Progress>
              <div>
                <h2 className={`mt-3 text-lg ${poppins700.className}`}>
                  Santiago
                </h2>
                <h3
                  className={`text-xs text-[#626262] bg-[#626262] bg-opacity-25 px-2 rounded-full ${poppins700.className}`}
                >
                  DESHABILITADO
                </h3>
              </div>
              <Image src={delivery4} alt="delivery" className="ml-3" />
            </div>
            <p className="my-5 border-dashed border-black border-t w-full"></p>
            <div className="flex justify-center">
              <ChevronArrowDown className="mt-6" />
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}