"use client";
import { Camera } from "@/commons/icons/Camera";
import { CloseEyeIcon } from "@/commons/icons/CloseEyeIcon";
import { LeftArrowIcon } from "@/commons/icons/LeftArrowIcon";
import { OpenEyeIcon } from "@/commons/icons/OpenEyeIcon";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedDataString = localStorage.getItem("usersData");
    if (!storedDataString) {
      alert("Error: No se pudo encontrar la información de usuarios.");
      return;
    }

    storedDataString;

    const storedData = JSON.parse(storedDataString);
    const { StoredUsers } = storedData;

    type User = {
      id: number;
      name: string;
      lastName: string;
      email: string;
      password: string;
      role: string;
      status: string;
      day: string | null;
      img: string;
    };

    const isEmailRegistered = StoredUsers.some((u: User) => u.email === email);

    if (isEmailRegistered) {
      alert("El correo electrónico ya está registrado.");
      return;
    }

    const newUser = {
      id: StoredUsers.length + 1,
      name,
      lastName,
      email,
      password,
      role: "user",
      status: "enabled",
      day: null,
      img: "img",
    };

    StoredUsers.push(newUser);
    localStorage.setItem(
      "usersData",
      JSON.stringify({ StoredUsers: StoredUsers })
    );

    alert("Usuario Registrado");
    router.push("/");
  };

  const handleValidation = {
    handleName: (value: string) => {
      if (/^[A-Za-z]+$/.test(value)) {
        return;
      } else {
        alert("Nombre solo con letras");
        setName("");
      }
    },
    handleLastName: (value: string) => {
      if (/^[A-Za-z]+$/.test(value)) {
        return;
      } else {
        alert("Apellido solo con letras");
        setLastName("");
      }
    },
    handleEmail: (value: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(value)) {
        return;
      } else {
        alert("El email debe contener @xxx.xxx");
        setEmail("");
      }
    },
    handlePassword: (value: string) => {
      if (value.length >= 8) {
        return;
      } else {
        setPassword("");
        alert("La contraseña debe ser mayor a 8 caracteres");
      }
    },
    handleConfirmPassword: (value: string) => {
      if (value === password) {
        return;
      } else {
        setConfirmPassword("");
        alert("No son iguales");
      }
    },
  };

  // value={confirmPassword} onChange={(e)=> setConfirmPassword(e.currentTarget.value)} onBlur={(e) => handleValidation.handleConfirmPassword(e.currentTarget.value)} required

  return (
    <main className="bg-[#AEE3EF] h-screen">
      <Navbar />
      <section className="flex justify-center mt-9">
        <section className="bg-[#55BBD1] h-[150px] rounded-xl">
          <div className="flex gap-12 mt-3 mb-2">
            <Link href="/">
              <LeftArrowIcon className="w-8 h-auto text-white ml-3" />
            </Link>
            <h1 className="flex justify-center text-lg font-poppins font-semibold text-white">
              Creá tu cuenta
            </h1>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-5 w-80 h-[600px]">
            <div className="flex justify-center mb-4">
              <Camera className="w-24 h-auto text-[#F4C455]" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  onBlur={(e) =>
                    handleValidation.handleName(e.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  onBlur={(e) =>
                    handleValidation.handleLastName(e.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                  placeholder="Email@contraseña.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  onBlur={(e) =>
                    handleValidation.handleEmail(e.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
                <input
                  type="password"
                  className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  onBlur={(e) =>
                    handleValidation.handlePassword(e.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <OpenEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
                <input
                  type="password"
                  className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  onBlur={(e) =>
                    handleValidation.handleConfirmPassword(
                      e.currentTarget.value
                    )
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full"
                >
                  Crear
                </button>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="font-poppins font-normal inline-block text-sm"
                >
                  ¿Ya tenés una cuenta?
                </a>
              </div>
              <div className="mb-4 mt-4">
                <Link href="/">
                  <button className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]">
                    Iniciar Sesión
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
