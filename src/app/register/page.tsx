'use client'
import { Camera } from '@/commons/icons/Camera'
import { CloseEyeIcon } from '@/commons/icons/CloseEyeIcon'
import { OpenEyeIcon } from '@/commons/icons/OpenEyeIcon'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import axiosInstance from '../../../axiosConfig'
import MainContainer from '@/commons/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '@/commons/Spinner'
import {
    setCreateUserLoading,
    setIsLoading,
    setRegisterLoading,
} from '@/store/slice/isLoading/loadingSlice'
import { useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
    const router = useRouter()
    const dispatch = useDispatch()
    const loadingStates = useSelector((store: any) => store.loadingReducer)

    const MAX_FILE_SIZE_MB = 5

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [userImage, setUserImage] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]

        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.warning(
                    `El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB.`
                )
                e.target.value = ''
                return
            }

            setUserImage(file)
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { name, lastName, email, password } = formValues

        try {
            dispatch(setCreateUserLoading(true))
            await axiosInstance.post(`/users`, {
                name,
                lastName,
                email,
                password,
            })

            dispatch(setCreateUserLoading(false))
            toast.success('Usuario Registrado')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        } catch (err) {
            console.error(err)
            dispatch(setCreateUserLoading(false))
            toast.error(
                'Error al intentar registrar usuario. Verifica tus datos e intenta nuevamente.'
            )
        }
    }

    const handleClick = () => {
        dispatch(setIsLoading(true))
        dispatch(setCreateUserLoading(false))
    }

    const handleClick2 = () => {
        dispatch(setRegisterLoading(true))
        dispatch(setCreateUserLoading(false))
    }

    const buttonOpacityClass = isRegisterComplete()
        ? 'opacity-100'
        : 'opacity-50'

    // value={confirmPassword} onChange={(e)=> setConfirmPassword(e.currentTarget.value)} onBlur={(e) => handleValidation.handleConfirmPassword(e.currentTarget.value)} required

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />
            <Navbar />
            <section className="flex justify-center mt-1">
                <MainContainer title={'Creá tu cuenta'} height={'90%'}>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-4">
                            {userImage ? (
                                <img
                                    src={URL.createObjectURL(userImage)}
                                    alt="User"
                                    className="w-24 h-auto rounded-full"
                                />
                            ) : (
                                <label
                                    htmlFor="upload"
                                    className="cursor-pointer"
                                >
                                    <Camera className="w-24 h-auto text-[#F4C455]" />
                                </label>
                            )}
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
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
                        <div className="mb-4 relative">
                            {showPassword ? (
                                <button
                                    type="button"
                                    className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                    onClick={handleTogglePassword}
                                >
                                    <CloseEyeIcon className="text-gray-400" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                    onClick={handleTogglePassword}
                                >
                                    <OpenEyeIcon className="text-gray-400 " />
                                </button>
                            )}
                            <input
                                type={showPassword ? 'text' : 'password'}
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
                        <div className="mb-4 relative">
                            {showConfirmPassword ? (
                                <button
                                    type="button"
                                    className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                    onClick={handleToggleConfirmPassword}
                                >
                                    <CloseEyeIcon className="text-gray-400" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                    onClick={handleToggleConfirmPassword}
                                >
                                    <OpenEyeIcon className="text-gray-400 " />
                                </button>
                            )}
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
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
                                onClick={handleClick2}
                                type="submit"
                                className={`font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                disabled={!isRegisterComplete()}
                            >
                                {!loadingStates.registerLoading ? (
                                    'Crear'
                                ) : (
                                    <Spinner />
                                )}
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
                                <button
                                    onClick={handleClick}
                                    className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]"
                                >
                                    {!loadingStates.isLoading ? (
                                        'Iniciar Sesión'
                                    ) : (
                                        <Spinner />
                                    )}
                                </button>
                            </Link>
                        </div>
                    </form>
                </MainContainer>
            </section>
        </main>
    )
}
