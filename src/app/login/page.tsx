import Image from "next/image";
import { LeftArrowIcon, CloseEyeIcon, UserLogin, LockIcon } from "@/commons/icons";
import mainLogo from "../../../public/mainLogo.png"

export default function Login() {
  return (
    <div>
      <main className="bg-[#AEE3EF] h-screen">
        <div className= "flex justify-center">
          <Image src={mainLogo} width={280} alt="Logo" className="mt-24"/>
        </div>
        <section className="flex justify-center mt-9">
          <section className="bg-[#55BBD1] h-[80px] rounded-xl mt-4">
              <h1 className="flex justify-center text-xl mt-3 font-bold text-white">Iniciar Sesión</h1>
            <div className="mt-2 bg-white rounded-xl shadow-xl p-5 w-80 h-[300px]">
              <form>
                <div className="mb-4 gap-5">
                  <UserLogin className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute"/>
                  <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none" placeholder="    Email@contraseña.com" />
                </div>
                <div className="mb-4">
                <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute"/>
                <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute"/>
                  <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none" placeholder="    **********" />
                </div>
                <div className="mb-4">
                  <button type="submit" className="w-full px-4 py-2 font-bold bg-[#F4C455] rounded-full">
                    Ingresar
                  </button>
                </div>
              </form>
              <div className="mb-4 mt-4">
                <button className="w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]">Crear Cuenta</button>
              </div>
              <div className="text-center mt-8">
                <a href="#" className="inline-block text-xs text-gray-500">
                  OLVIDÉ MI CONTRASEÑA
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
