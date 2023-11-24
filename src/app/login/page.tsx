'use client';
import Image from 'next/image';
import { CloseEyeIcon, UserLogin, LockIcon } from '@/commons/icons';
import mainLogo from '../../../public/mainLogo.png';
import { poppins400, poppins600, poppins700 } from '@/commons/fonts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    localStorage.setItem('userAdminApp', JSON.stringify({ 
      name: "Fiama",
      lastName: "Talavera",
      email: "fiama@gmail.com",
      password: "12345678",
      admin: true
     }));
    
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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let userStorageInfoString = localStorage.getItem('userApp');
        let userStorageInfo = userStorageInfoString ? JSON.parse(userStorageInfoString) : null;
        let adminStorageInfoString = localStorage.getItem('userAdminApp');
        let adminStorageInfo = adminStorageInfoString ? JSON.parse(adminStorageInfoString) : null;

        if (userStorageInfo && userStorageInfo.admin === false) {
            if (email !== userStorageInfo.email || password !== userStorageInfo.password) {
              alert('Datos inválidos');
              setEmail('')
              setPassword('')
            } 
            else {
                alert('Logueo exitoso!');
                router.push("/working-day")
            }
        } else if(adminStorageInfo && adminStorageInfo.admin === true) {
          if (email !== adminStorageInfo.email || password !== adminStorageInfo.password) {
            alert('Datos inválidos');
            setEmail('')
            setPassword('')
          } 
          else {
              alert('Logueo exitoso!');
              router.push("/manage-orders")
          }
        }
    };

    // value={password} onChange={(e)=> setPassword(e.currentTarget.value)} onBlur={(e) => handleValidation.handlePassword(e.currentTarget.value)} required

    return (
        <div>
            <main className="bg-[#AEE3EF] h-screen">
                <div className="flex justify-center">
                    <Image src={mainLogo} width={280} alt="Logo" className="mt-24" />
                </div>
                <section className="flex justify-center mt-9">
                    <section className="bg-[#55BBD1] h-[80px] rounded-xl mt-4">
                        <h1 className={`flex justify-center text-lg ${poppins700.className} mt-3 font-bold text-white`}>Iniciar Sesión</h1>
                        <div className="mt-2 bg-white rounded-xl shadow-xl p-5 w-80 h-[300px]">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 gap-5">
                                    {/* <UserLogin className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" /> */}
                                    <input type="email" className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`} placeholder="nombre@mail.com" value={email} onBlur={(e) => handleValidation.handleEmail(e.currentTarget.value)} onChange={(e) => setEmail(e.currentTarget.value)} required />
                                </div>
                                <div className="mb-4">
                                    {/* <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" /> */}
                                    {/* <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" /> */}
                                    <input type="password" className={`${poppins400.className} w-full px-4 py-2 border rounded-lg focus:outline-none`} placeholder="    **********" value={password} onChange={(e) => setPassword(e.currentTarget.value)} onBlur={(e) => handleValidation.handlePassword(e.currentTarget.value)} required />
                                </div>
                                <div className="mb-4">
                                    <button type="submit" onSubmit={handleSubmit} className={`${poppins600.className} w-full px-4 py-2 font-bold bg-[#F4C455] rounded-full`}>
                                        Ingresar
                                    </button>
                                </div>
                            </form>
                            <div className="mb-4 mt-4">
                                <button className={`${poppins400.className} w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]`}>Crear Cuenta</button>
                            </div>
                            <div className="text-center mt-8">
                                <a href="#" className={`${poppins400.className} inline-block text-sm`}>
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
