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
import Spinner from '@/commons/Spinner'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function Register() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const MAX_FILE_SIZE_MB = 5

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [userImage, setUserImage] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]

        if (file) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.warning(`El archivo es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB} MB.`)
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
        isRegisterComplete,
        setConfirmPassword,
        isRegisterFormValid,
    } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { name, lastName, email, password } = formValues

        if (!isRegisterFormValid()) {
            toast.error('Completa bien el formulario.')
            return
        }

        try {
            setIsLoading(true)

            let imageUrl = 'https://res.cloudinary.com/dpbr1u8z5/image/upload/v1707342606/aj7jifsxooynzimddz9u.png'

            if (userImage) {
                const formData = new FormData()
                formData.append('userImage', userImage)

                const response = await axios.post('api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                imageUrl = response.data.url
            }

            await axiosInstance.post(`/users`, {
                name,
                lastName,
                email,
                password,
                iconUrl: imageUrl || '',
            })

            toast.success('Usuario Registrado')
            router.push('/')
        } catch (err: any) {
            setIsLoading(false)
            console.error(err)
            toast.error(`${err.response.data.message}`)
        }
    }

    const buttonOpacityClass = isRegisterComplete() && isRegisterFormValid() ? 'opacity-100' : 'opacity-50'

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center mt-1">
                <MainContainer title={'Creá tu cuenta'} height={'90%'}>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-4">
                            {userImage ? (
                                <img src={URL.createObjectURL(userImage)} alt="User" className="w-24 h-auto rounded-full" />
                            ) : (
                                <label htmlFor="upload" className="cursor-pointer">
                                    <Camera className="w-24 h-auto text-[#F4C455]" />
                                </label>
                            )}
                            <input id="upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Nombre"
                                value={formValues.name}
                                onChange={(e) => {
                                    validateName(e.currentTarget.value)
                                    setName(e.currentTarget.value)
                                }}
                                required
                            />{' '}
                            {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Apellido"
                                value={formValues.lastName}
                                onChange={(e) => {
                                    validateLastName(e.currentTarget.value)
                                    setLastName(e.currentTarget.value)
                                }}
                                required
                            />{' '}
                            {errors.lastName && <span className="text-red-600 text-xs">{errors.lastName}</span>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Email@contraseña.com"
                                value={formValues.email}
                                onChange={(e) => {
                                    validateEmail(e.currentTarget.value)
                                    setEmail(e.currentTarget.value)
                                }}
                                required
                            />{' '}
                            {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
                        </div>
                        <div className="mb-4 relative">
                            {showPassword ? (
                                <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleTogglePassword}>
                                    <CloseEyeIcon className="text-gray-400" />
                                </button>
                            ) : (
                                <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleTogglePassword}>
                                    <OpenEyeIcon className="text-gray-400 " />
                                </button>
                            )}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="**********"
                                value={formValues.password}
                                onChange={(e) => {
                                    validatePassword(e.currentTarget.value)
                                    setPassword(e.currentTarget.value)
                                    validateConfirmPassword(formValues.confirmPassword, e.currentTarget.value)
                                }}
                                required
                            />{' '}
                            {errors.password && <span className="text-red-600 text-xs">{errors.password}</span>}
                        </div>
                        <div className="mb-4 relative">
                            {showConfirmPassword ? (
                                <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleToggleConfirmPassword}>
                                    <CloseEyeIcon className="text-gray-400" />
                                </button>
                            ) : (
                                <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleToggleConfirmPassword}>
                                    <OpenEyeIcon className="text-gray-400 " />
                                </button>
                            )}
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Confirmar contraseña"
                                value={formValues.confirmPassword}
                                onChange={(e) => {
                                    validateConfirmPassword(e.currentTarget.value, formValues.password)
                                    setConfirmPassword(e.currentTarget.value)
                                }}
                                onBlur={(e) => {
                                    validateConfirmPassword(e.currentTarget.value, formValues.password)
                                }}
                                required
                            />{' '}
                            {errors.confirmPassword && <span className="text-red-600 text-xs">{errors.confirmPassword}</span>}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className={`font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                disabled={isRegisterComplete() && isRegisterFormValid() ? false : true}
                            >
                                {!isLoading ? 'Crear' : <Spinner />}
                            </button>
                        </div>

                        <div className="text-center">
                            <a href="#" className="font-poppins font-normal inline-block text-sm">
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
