'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '../../../../axiosConfig'
import MainContainer from '@/commons/MainContainer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '@/commons/Spinner'
import { useValidations } from '@/hooks/validationHooks'
import { CloseEyeIcon } from '@/commons/icons/CloseEyeIcon'
import { OpenEyeIcon } from '@/commons/icons/OpenEyeIcon'
import Image from 'next/image'
import mainLogo from '../../../../public/mainLogo.png'

export default function ConfirmUserPage(props: any) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const { formValues, errors, validatePassword, validateConfirmPassword, setPassword, setConfirmPassword } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const { password } = formValues

        try {
            await axiosInstance.patch(`/users/set-password/${props.params.registerToken}`, {
                password: password,
            })

            toast.success('Contraseña restablecida exitosamente.')
            router.push('/')
        } catch (err) {
            setIsLoading(false)
            console.error(err)
            toast.error('Error al intentar restablecer la contraseña. Verifica tus datos e intenta nuevamente.')
        }
    }

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <div className="flex justify-center">
                <Image src={mainLogo} width={280} alt="Logo" className="mt-24" />
            </div>
            <section className="flex justify-center mt-9">
                <MainContainer title={'Restablecer Contraseña'} height="">
                    <form onSubmit={handleSubmit}>
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
                                placeholder="Nueva contraseña"
                                value={formValues.password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                onBlur={(e) => validatePassword(e.currentTarget.value)}
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
                                placeholder="Confirmar nueva contraseña"
                                value={formValues.confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                onBlur={(e) => validateConfirmPassword(e.currentTarget.value, formValues.password)}
                                required
                            />{' '}
                            {errors.confirmPassword && <span className="text-red-600 text-xs">{errors.confirmPassword}</span>}
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full">
                                {!isLoading ? 'Enviar' : <Spinner />}
                            </button>
                        </div>
                    </form>
                </MainContainer>
            </section>
        </main>
    )
}
