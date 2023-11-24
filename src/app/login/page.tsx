'use client';
import Image from 'next/image';
import mainLogo from '../../../public/mainLogo.png';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { users } from "@/services/users.json"
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const initializeFakeData = () => {
    if (typeof window !== 'undefined') {
      const storedDataString = localStorage.getItem('usersData');
      if (!storedDataString || !JSON.parse(storedDataString).StoredUsers) {
        const fakeData = users;
        localStorage.setItem("usersData", JSON.stringify({ StoredUsers: fakeData }));
      }
    }
  };
  
  // Llama a esta función para inicializar la fake data
  initializeFakeData();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedDataString = localStorage.getItem('usersData');
    if (!storedDataString) {
      alert('Error: No se pudo encontrar la información de usuarios.');
      return;
    }
  
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
      }

      const user = StoredUsers.find((u: User) => u.email === email && u.password === password);

    if (user) {
      alert('Logueo exitoso!');
      if (user.role === 'admin') {
        router.push('/manage-orders');
      } else {
        router.push('/working-day');
      }
    } else {
      alert('Datos inválidos');
      setEmail('');
      setPassword('');
    }
  };

  const handleValidation = {
    handleEmail: (value: string) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(value)) {
        return;
      } else {
        alert('El email debe contener @xxx.xxx');
        setEmail('');
      }
    },
    handlePassword: (value: string) => {
      if (value.length >= 8) {
        return;
      } else {
        setPassword('');
        alert('La contraseña debe ser mayor a 8 caracteres');
      }
    },
  };

    return (
     <div>
      <main className="bg-[#AEE3EF] h-screen">
        <div className="flex justify-center">
          <Image src={mainLogo} width={280} alt="Logo" className="mt-24" />
        </div>
        <section className="flex justify-center mt-9">
          <section className="bg-[#55BBD1] h-[80px] rounded-xl mt-4">
            <h1 className="flex justify-center text-lg font-poppins font-bold mt-3 text-white">
              Iniciar Sesión
            </h1>
            <div className="mt-2 bg-white rounded-xl shadow-xl p-5 w-80 h-[300px]">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 gap-5">
                  {/* <UserLogin className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" /> */}
                  <input
                    type="email"
                    className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="nombre@mail.com"
                    value={email}
                    onBlur={(e) =>
                      handleValidation.handleEmail(e.currentTarget.value)
                    }
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  {/* <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" />
                  <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" /> */}
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
                  <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="font-poppins font-semibold w-full px-4 py-2 bg-[#F4C455] rounded-full"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
              <div className="mb-4 mt-4">
                <Link href={"/register"}><button className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]">
                  Crear Cuenta
                </button></Link>
              </div>
              <div className="text-center mt-8">
                <a
                  href="#"
                  className="font-poppins font-normal inline-block text-sm"
                >
                  OLVIDÉ MI CONTRASEÑA
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
    )
}

