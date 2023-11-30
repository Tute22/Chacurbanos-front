'use client'
import Image from 'next/image'
import mainLogo from '../../../public/mainLogo.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import axios from 'axios'
import MainContainer from '@/commons/MainContainer'


export default function Login() {
    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT

    const {
        formValues,
        errors,
        validateEmail,
        validatePassword,
        setEmail,
        setPassword,
        isLoginComplete,
    } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = formValues

        try {
            const response = await axios.post(`${port}/users/login`, {
                email,
                password,
            })


            
            const { user, token } = response.data

            localStorage.setItem('token', token)

            alert('Logueo exitoso!')
            if (user.role === 'admin') {
                router.push('/manage-orders')
            } else {
                router.push('/working-day')
            }
        } catch (error) {
            alert('Datos inválidos')
            console.error(error)
        }
    }

    const buttonOpacityClass = isLoginComplete() ? 'opacity-100' : 'opacity-50'

    return (
        <div>
            <main className="bg-[#AEE3EF] h-screen">
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={280}
                        alt="Logo"
                        className="mt-24"
                    />
                </div>
                <section className="flex justify-center mt-9">
                    <MainContainer title={'Iniciar Sesión'} height="">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 gap-5">
                                {/* <UserLogin className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" /> */}
                                <input
                                    type="email"
                                    className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    placeholder="nombre@mail.com"
                                    value={formValues.email}
                                    onBlur={(e) =>
                                        validateEmail(e.currentTarget.value)
                                    }
                                    onChange={(e) =>
                                        setEmail(e.currentTarget.value)
                                    }
                                    required
                                />{' '}
                                {errors.email && (
                                    <span className="text-red-600 text-xs">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                {/* <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" />
                  <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" /> */}
                                <input
                                    type="password"
                                    className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    placeholder="**********"
                                    value={formValues.password}
                                    onChange={(e) =>
                                        setPassword(e.currentTarget.value)
                                    }
                                    onBlur={(e) =>
                                        validatePassword(e.currentTarget.value)
                                    }
                                    required
                                />{' '}
                                {errors.password && (
                                    <span className="text-red-600 text-xs">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <button
                                    onSubmit={handleSubmit}
                                    className={`font-poppins font-semibold w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                    disabled={!isLoginComplete()}
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                        <div>
                            <Link href={'/register'}>
                                <button className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]">
                                    Crear Cuenta
                                </button>
                            </Link>
                        </div>
                        <div className="text-center mt-4">
                            <a
                                href="#"
                                className="font-poppins font-normal inline-block text-sm"
                            >
                                OLVIDÉ MI CONTRASEÑA
                            </a>
                        </div>
                    </MainContainer>
                </section>
            </main>
        </div>
    )
}
