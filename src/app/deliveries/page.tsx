'use client'

import { ChevronArrowDown } from '@/commons/icons/ChevronArrowDown'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import delivery3 from '../../../public/delivery3.svg'
import delivery4 from '../../../public/delivery4.svg'
import delivery5 from '../../../public/delivery5.svg'
import delivery6 from '../../../public/delivery6.svg'
import Link from 'next/link'
import { DateTime } from 'luxon'
import MainContainer from '@/commons/MainContainer'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { CircularProgressbar } from 'react-circular-progressbar'

export default function Deliveries() {
    const now = DateTime.local()

    const port = process.env.NEXT_PUBLIC_PORT

    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axios.get(`${port}/users/${storedToken}`)
                const decodedToken = response.data.decodedToken
                console.log('Token encontrado y decodificado:', decodedToken)

                if (decodedToken.role !== 'admin') {
                    router.push('/')
                }
            } catch (err) {
                console.error(err)
                alert('Error al intentar obtener usuario.')
            }
        }

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }
    }, [port, router])

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center mt-5">
                <MainContainer title={'Repartidores'} height={'600px'}>
                    <div className="flex">
                        <div>
                            <h1 className="text-black text-xl mb-1 mt-2 font-poppins font-bold">
                                Enero
                            </h1>
                            <p className="border-dashed border-[#F4C455] border-t w-56"></p>
                        </div>
                        <div
                            className={`flex flex-col items-center border border-solid border-[#F4C455] rounded-xl w-[42px] text-[#55BBD1] shadow-lg py-2 px-7`}
                        >
                            <h3 className="text-lg font-poppins font-normal">
                                {now.weekdayShort}
                            </h3>
                            <h1 className="text-xl font-poppins font-bold">
                                {now.day}
                            </h1>
                        </div>
                    </div>

                    <Link href={'/delivery-profile'}>
                        <div className="flex gap-5">
                            <CircularProgressbar
                                className="w-[75px] h-[75px]"
                                value={52}
                                text="52%"
                            />
                            <div>
                                <h2 className="mt-3 text-lg font-poppins font-semibold">
                                    Farid
                                </h2>
                                <h3 className="text-xs bg-[#F4C455] px-2 rounded-full font-poppins font-bold">
                                    EN CURSO
                                </h3>
                            </div>
                            <Image
                                src={delivery3}
                                alt="delivery"
                                className="ml-12"
                            />
                        </div>
                    </Link>
                    <p className="my-5 border-dashed border-black border-t w-full"></p>
                    <div className="flex gap-5">
                        <CircularProgressbar
                            className="w-[75px] h-[75px]"
                            value={100}
                            text="100%"
                        />
                        <div>
                            <h2 className="mt-3 text-lg font-poppins font-bold">
                                Luciana
                            </h2>
                            <h3 className="text-xs bg-[#8EEE86] px-2 rounded-full font-poppins font-bold">
                                ENTREGADO
                            </h3>
                        </div>
                        <Image
                            src={delivery5}
                            alt="delivery"
                            className="ml-9"
                        />
                    </div>
                    <p className="my-5 border-dashed border-black border-t w-full"></p>
                    <div className="flex gap-5">
                        <CircularProgressbar
                            className="w-[75px] h-[75px]"
                            value={80}
                            text="80%"
                        />
                        <div>
                            <h2 className="mt-3 text-lg font-poppins font-bold">
                                Dario
                            </h2>
                            <h3 className="text-xs bg-[#F4C455] px-2 rounded-full font-poppins font-bold">
                                EN CURSO
                            </h3>
                        </div>
                        <Image
                            src={delivery6}
                            alt="delivery"
                            className="ml-12"
                        />
                    </div>
                    <p className="my-5 border-dashed border-black border-t w-full"></p>
                    <div className="flex gap-5">
                        <CircularProgressbar
                            className="w-[75px] h-[75px]"
                            value={0}
                            text="0%"
                        />
                        <div>
                            <h2 className="mt-3 text-lg font-poppins font-bold">
                                Santiago
                            </h2>
                            <h3 className="text-xs text-[#626262] bg-[#626262] bg-opacity-25 px-2 rounded-full font-poppins font-bold">
                                DESHABILITADO
                            </h3>
                        </div>
                        <Image
                            src={delivery4}
                            alt="delivery"
                            className="ml-3"
                        />
                    </div>
                    <p className="my-5 border-dashed border-black border-t w-full"></p>
                    <div className="flex justify-center">
                        <ChevronArrowDown className="mt-2" />
                    </div>
                </MainContainer>
            </section>
        </main>
    )
}
