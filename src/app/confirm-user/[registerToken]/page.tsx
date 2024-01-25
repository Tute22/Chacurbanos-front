'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '../../../../axiosConfig'
import MainContainer from '@/commons/MainContainer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '@/commons/Spinner'

export default function ConfirmUserPage(props: any) {
    const router = useRouter()

    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axiosInstance.patch(
                `/users/set-password/${props.params.registerToken}`,
                {
                    password: password,
                }
            )

            toast.success('Contraseña restablecida exitosamente.')
            setTimeout(() => {
                router.push('/')
            }, 1500)
        } catch (err) {
            setIsLoading(false)
            console.error(err)
            toast.error(
                'Error al intentar restablecer la contraseña. Verifica tus datos e intenta nuevamente.'
            )
        }
    }

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <section className="flex justify-center">
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
                                {!isLoading ? 'Enviar' : <Spinner />}
                            </button>
                        </div>
                    </form>
                </MainContainer>
            </section>
        </main>
    )
}
