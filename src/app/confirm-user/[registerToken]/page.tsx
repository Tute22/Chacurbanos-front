'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MainContainer from '@/commons/MainContainer'
//
export default function ConfirmUserPage(props: any) {
    const router = useRouter()
    const port = process.env.NEXT_PUBLIC_PORT

    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.patch(
                `${port}/users/set-password/${props.params.registerToken}`,
                {
                    password: password,
                }
            )

            alert('Contraseña restablecida exitosamente.')
            router.push('/')
        } catch (err) {
            console.error(err)
            alert(
                'Error al intentar restablecer la contraseña. Verifica tus datos e intenta nuevamente.'
            )
        }
    }

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <section className="flex justify-center mt-1">
                <MainContainer title={'Restablecer Contraseña'} height={'90%'}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="font-poppins font-normal w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="Nueva Contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.currentTarget.value)
                                }
                                required
                            />
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
