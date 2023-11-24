"use client";
import React from "react";
import Image from "next/image";
import navbarLogo from "../../public/navbarLogo.svg";
import { LogoutDoorIcon } from "@/commons/icons/LogoutDoorIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <nav className="h-14 bg-[#AEE3EF] shadow-nav py-2 px-8 flex justify-between">
      <Link href={"/"}>
        {" "}
        {/* Despues cambiar a working-day para repartidor y manage-orders para admin */}
        <Image src={navbarLogo} width={56} height={160} alt="navbarLogo" />
      </Link>
      {pathName === "/register" ? (
        ""
      ) : (
        <div
          className="w-7 rounded-md cursor-pointer my-[4px] bg-[#55BBD1] shadow-logout-button flex items-center justify-center"
          onClick={() => router.push("/")}
        >
          <LogoutDoorIcon className="w-6 ml-[3px]" />
        </div>
      )}
    </nav>
  );
};
