import { poppins400, poppins600, poppins700 } from "@/commons/fonts";
import {
  Camera,
  CloseEyeIcon,
  LeftArrowIcon,
  OpenEyeIcon,
} from "@/commons/icons";
import { Navbar } from "@/components/Navbar";

export default function Register() {
  return (
    <main className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <section className="flex justify-center mt-9">
        <section className="bg-[#55BBD1] h-[150px] rounded-xl">
          <div className="flex gap-12 mt-3 mb-2">
            <LeftArrowIcon className="w-8 h-auto text-white ml-3" />
            <h1
              className={`flex justify-center text-lg ${poppins700.className} text-white`}
            >
              Creá tu cuenta
            </h1>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-5 w-80 h-[600px]">
            <div className="flex justify-center mb-4">
              <Camera className="w-24 h-auto text-[#F4C455]" />
            </div>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`}
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`}
                  placeholder="Apellido"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`}
                  placeholder="Email@contraseña.com"
                />
              </div>
              <div className="mb-4">
                <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
                <input
                  type="password"
                  className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`}
                  placeholder="**********"
                />
              </div>
              <div className="mb-4">
                <OpenEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
                <input
                  type="password"
                  className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`}
                  placeholder="Confirmar contraseña"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className={`${poppins600.className} w-full px-4 py-2 font-bold bg-[#F4C455] rounded-full`}
                >
                  Crear
                </button>
              </div>
            </form>
            <div className="text-center">
              <a
                href="#"
                className={`${poppins400.className} inline-block text-sm`}
              >
                ¿Ya tenés una cuenta?
              </a>
            </div>
            <div className="mb-4 mt-4">
              <button
                className={`${poppins400.className} w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]`}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
