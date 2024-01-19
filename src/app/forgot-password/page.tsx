'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import MainContainer from '@/commons/MainContainer'
import { useValidations } from '@/hooks/validationHooks'
import axios from 'axios'

export default function ForgotPassword() {
    const port = process.env.NEXT_PUBLIC_PORT

    const [email, setEmail] = useState('')

    const { errors, validateEmail } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.post(`${port}/users/reset-password`, {
                email: email,
            })

            alert(
                'Se ha enviado un correo electrónico para restablecer la contraseña.'
            )
        } catch (err) {
            console.error(err)
            alert(
                'Error al intentar enviar el correo electrónico. Verifica tu correo e inténtalo nuevamente.'
            )
        }
    }

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center mt-1">
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
                                Enviar
                            </button>
                        </div>
                    </form>
                </MainContainer>
            </section>
        </main>
    )
}
