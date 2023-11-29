'use client'
import { Camera } from '@/commons/icons/Camera'
import { CloseEyeIcon } from '@/commons/icons/CloseEyeIcon'
import { OpenEyeIcon } from '@/commons/icons/OpenEyeIcon'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import MainContainer from '@/commons/MainContainer'

export default function Register() {
    const router = useRouter()

    const {
        formValues,
        errors,
        validateName,
        validateLastName,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        setName,
        setLastName,
        setEmail,
        setPassword,
        setConfirmPassword,
        isRegisterComplete,
    } = useValidations()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, lastName, email, password } = formValues

        const storedDataString = localStorage.getItem('usersData')
        if (!storedDataString) {
            alert('Error: No se pudo encontrar la información de usuarios.')
            return
        }

        storedDataString

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

        const isEmailRegistered = StoredUsers.some(
            (u: User) => u.email === email
        )

        if (isEmailRegistered) {
            alert('El correo electrónico ya está registrado.')
            return
        }

        const newUser = {
            id: StoredUsers.length + 1,
            name,
            lastName,
            email,
            password,
            role: 'user',
            status: 'enabled',
            day: null,
            img: 'img',
        }

        StoredUsers.push(newUser)
        localStorage.setItem(
            'usersData',
            JSON.stringify({ StoredUsers: StoredUsers })
        )

        alert('Usuario Registrado')
        router.push('/')
    }

    const buttonOpacityClass = isRegisterComplete()
        ? 'opacity-100'
        : 'opacity-50'

    // value={confirmPassword} onChange={(e)=> setConfirmPassword(e.currentTarget.value)} onBlur={(e) => handleValidation.handleConfirmPassword(e.currentTarget.value)} required

    return (
        <main className="bg-[#AEE3EF] h-screen overflow-auto">
            <Navbar />
            <section className="flex justify-center mt-1">
                <MainContainer title={'Creá tu cuenta'} height={'90%'}>
                    <div className="flex justify-center mb-4">
                        <Camera className="w-24 h-auto text-[#F4C455]" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Nombre"
                                value={formValues.name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                onBlur={(e) =>
                                    validateName(e.currentTarget.value)
                                }
                                required
                            />{' '}
                            {errors.name && (
                                <span className="text-red-600 text-xs">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Apellido"
                                value={formValues.lastName}
                                onChange={(e) =>
                                    setLastName(e.currentTarget.value)
                                }
                                onBlur={(e) =>
                                    validateLastName(e.currentTarget.value)
                                }
                                required
                            />{' '}
                            {errors.lastName && (
                                <span className="text-red-600 text-xs">
                                    {errors.lastName}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Email@contraseña.com"
                                value={formValues.email}
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                                onBlur={(e) =>
                                    validateEmail(e.currentTarget.value)
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
                            <CloseEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
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
                            <OpenEyeIcon className=" text-gray-400 w-5 h-6 mr-2 ml-[253px] mt-2 absolute" />
                            <input
                                type="password"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Confirmar contraseña"
                                value={formValues.confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.currentTarget.value)
                                }
                                onBlur={(e) =>
                                    validateConfirmPassword(
                                        e.currentTarget.value,
                                        formValues.password
                                    )
                                }
                                required
                            />{' '}
                            {errors.confirmPassword && (
                                <span className="text-red-600 text-xs">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className={`font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                disabled={!isRegisterComplete()}
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
                </MainContainer>
            </section>
        </main>
    )
}
