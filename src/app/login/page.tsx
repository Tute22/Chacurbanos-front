'use client'
import Image from 'next/image'
import mainLogo from '../../../public/mainLogo.png'
import { users } from '@/services/users.json'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import MainContainer from '@/commons/MainContainer'

export default function Login() {
    const router = useRouter()

    const {
        formValues,
        errors,
        validateEmail,
        validatePassword,
        setEmail,
        setPassword,
        isLoginComplete,
    } = useValidations()

    const initializeFakeData = () => {
        if (typeof window !== 'undefined') {
            const storedDataString = localStorage.getItem('usersData')
            if (
                !storedDataString ||
                !JSON.parse(storedDataString).StoredUsers
            ) {
                const fakeData = users
                localStorage.setItem(
                    'usersData',
                    JSON.stringify({ StoredUsers: fakeData })
                )
            }
        }
    }

    initializeFakeData()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = formValues

        const storedDataString = localStorage.getItem('usersData')
        if (!storedDataString) {
            alert('Error: No se pudo encontrar la información de usuarios.')
            return
        }

        const storedData = JSON.parse(storedDataString)
        const { StoredUsers } = storedData

        type User = {
            id: number
            name: string
            lastName: string
            email: string
            password: string
            role: string
            status: string
            day: string | null
            img: string
        }

        const user = StoredUsers.find(
            (u: User) => u.email === email && u.password === password
        )

        if (user) {
            alert('Logueo exitoso!')
            if (user.role === 'admin') {
                router.push('/manage-orders')
            } else {
                router.push('/working-day')
            }
        } else {
            alert('Datos inválidos')
            setEmail('')
            setPassword('')
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
