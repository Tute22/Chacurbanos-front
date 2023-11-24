import Image from "next/image";
import mainLogo from "../../public/mainLogo.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
      <div className="flex justify-center">
        <Image src={mainLogo} width={280} alt="Logo" className="mt-24" />
      </div>
      <br />
      <br />
      <Link href={"/register"}>
        <button className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
          Register
        </button>
      </Link>
      <br />
      <br />
      <Link href={"/login"}>
        <button className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
          Login
        </button>
      </Link>
      <br />
      <br />
      <Link href={"/working-day"}>
        <button className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
          Working Day
        </button>
      </Link>
      <br />
      <br />
      <Link href={"/get-packages"}>
        <button className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
          Get Package
        </button>
      </Link>
      <br />
      <br />
      <Link href={"/distribution"}>
        <button className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
          Distribution
        </button>
      </Link>
    </main>
  );
}
