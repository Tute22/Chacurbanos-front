'use client'

import React, { useState } from 'react'
import MainContainer from '@/commons/MainContainer'
import { useValidations } from '@/hooks/validationHooks'
import axiosInstance from '../../../axiosConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '@/commons/Spinner'

//

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { errors, validateEmail } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault()

        try {
            await axiosInstance.post(`/users/reset-password`, {
                email: email,
            })

            toast.info(
                'Se ha enviado un correo electrónico para restablecer la contraseña.'
            )

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        } catch (err) {
            setIsLoading(false)
            console.error(err)
            toast.error(
                'Error al intentar enviar el correo electrónico. Verifica tu correo e inténtalo nuevamente.'
            )
        }
    }

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <section className="flex justify-center">
                <MainContainer title={'Recuperar Contraseña'} height={'90%'}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="nombre@mail.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                                onBlur={(e) =>
                                    validateEmail(e.currentTarget.value)
                                }
                                required
                            />
                            {errors.email && (
                                <span className="text-red-600 text-xs">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="font-poppins font-medium w-full px-4 py-2 bg-[#F4C455] rounded-full"
                            >
                                {!isLoading ? 'Enviar' : <Spinner />}
                            </button>
                        </div>
                    </form>
                </MainContainer>
            </section>
        </main>
    )
}
