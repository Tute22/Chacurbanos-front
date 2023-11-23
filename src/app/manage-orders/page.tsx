"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import adminLogo from "../../../public/adminFoto.png";
import delivery1 from "../../../public/delivery1.png";
import delivery2 from "../../../public/delivery2.png";
import { poppins300, poppins400, poppins500, poppins600, poppins700 } from "@/commons/fonts";
import { TriangleDownArrow, PlusIcon } from "@/commons/icons";
import { Progress } from "antd";
import { DateTime } from "luxon";
import { fiveDays, injectTime, getPreviousFiveDays, getNextFiveDays } from "@/utils/calendar";
import { membersEnabled, shipmentsDelivered, percentage } from "@/utils/calculations";
import { users } from "@/services/users.json"
import { packages } from "@/services/packages.json"


interface DayData {
  info: DateTime;
  number: number;
  day: string | null;
  time: string;
}

interface UserData {
  id: number,
  name: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  status: string,   
  day: string | null,       
  img: string;
}

interface PackageData {
  id: number,
  number_of_order: string,
  address: string,
  status: string | null,
  to: string,
  weight: number;
}

export default function ManageOrders() {
  const [renderedDays, setRenderedDays] = useState<DayData[]>([]);
  const [members, setMembers] = useState<UserData[]>([]);
  const [shipments, setShipments] = useState<PackageData[]>([]);


  const now = DateTime.local();
  const formattedDate = now.toFormat("dd/MM/yy");
  const days = fiveDays(formattedDate);
  injectTime(now, days);

  useEffect(() => {
    setRenderedDays(days);
    setMembers(users)
    setShipments(packages)
  }, []);

  const classBeforeToday = "flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5";
  const classToday = "flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5 bg-[#F4C455]";
  const classAfterToday = "flex flex-col items-center border rounded-xl w-[42px] m-0.5 bg-[#626262] bg-opacity-[20%]";

  const handlePreviousDays = () => {
    const previousDays = getPreviousFiveDays(renderedDays);
    setRenderedDays(previousDays);
    injectTime(now, previousDays);
  };

  const handleNextDays = () => {
    const nextDays = getNextFiveDays(renderedDays);
    setRenderedDays(nextDays);
    injectTime(now, nextDays);
  };

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
              <h1 className={`text-base ${poppins700.className} border-b-2 border-[#55BBD1] border-dotted w-[250px] mt-1`}>Noviembre</h1>
              <div>
                <div className="flex my-2">
                  <TriangleDownArrow className="rotate-90 w-[20px]" onClick={handlePreviousDays} />
                  {renderedDays.map((day) => (
                    <div key={day.number} className={`${day.time === "before" ? classBeforeToday : ""} ${day.time === "today" ? classToday : ""} ${day.time === "after" ? classAfterToday : ""}`}>
                      <h3 className={`text-lg ${poppins400.className} ${day.time === "after" ? "text-[#626262]" : ""}`}>{day.day}</h3>
                      <h1 className={`text-xl ${poppins700.className} ${day.time === "after" ? "text-[#626262]" : ""}`}>{day.number}</h1>
                    </div>
                  ))}
                  <TriangleDownArrow className="rotate-[-90deg] w-[20px]" onClick={handleNextDays} />
                </div>
              </div>
            </div>
            <br />
            <div className={`flex flex-col items-center border border-solid border-black rounded-xl`}>
              <div className="flex justify-between border-b-2 border-[#55BBD1] border-dotted w-[250px] mb-2">
                <h1 className={`text-base ${poppins700.className} mt-1`}>Detalles</h1>
                <div className="flex">
                  <h2 className={`text-base ${poppins500.className} mt-1`}>{formattedDate}</h2>
                  <TriangleDownArrow className="w-[20px] ml-1" />
                </div>
              </div>
              <div className="flex  justify-between w-[250px] mb-5">
                <Progress type="circle" percent={percentage(membersEnabled(members), members.length)} strokeColor="#55BBD1" size={70} className={`text-lg ${poppins600.className}`} />
                <div>
                  <h1 className={`text-sm ${poppins700.className}`}>Repartidores</h1>
                  <h3 className={`text-xs ${poppins300.className}`}>{`${membersEnabled(members)}/${members.length} Habilitados`}</h3>
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
                <Progress type="circle" percent={percentage(shipmentsDelivered(shipments), shipments.length)} strokeColor="#55BBD1" size={70} className={`text-lg ${poppins600.className}`} />
                <div>
                  <h1 className={`text-sm ${poppins700.className}`}>Paquetes</h1>
                  <h3 className={`text-xs ${poppins300.className}`}>{`${shipmentsDelivered(shipments)}/${shipments.length} Repartidos`}</h3>
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
