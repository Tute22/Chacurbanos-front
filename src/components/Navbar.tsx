"use client";
import React from "react";
import Image from "next/image";
import navbarLogo from "../../public/navbarLogo.svg"
import { LogoutDoorIcon } from "@/commons/icons";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="h-14 bg-[#AEE3EF] shadow-nav py-2 px-8 flex justify-between">
      <Image src={navbarLogo} width={56} height={160} alt="navbarLogo" />
      {pathName === "/register" ? (
        ""
      ) : (
        <div className="w-7 rounded-md my-[4px] bg-[#55BBD1] shadow-logout-button flex items-center justify-center">
          <LogoutDoorIcon className="w-6 ml-[3px]" />
        </div>
      )}
    </nav>
  );
};
