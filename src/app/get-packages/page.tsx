'use client'
import MainContainer from '@/commons/MainContainer'
import { CheckboxCheck } from '@/commons/icons/CheckboxCheck'
import { CheckboxEmpty } from '@/commons/icons/CheckboxEmpty'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Package } from '@/types/types'

export default function GetPackages() {
    // Donde guardaremos todos los paquetes
    const [packages, setPackages] = useState<Package[]>([])
    // Este estado es necesario para chequear que el estado de packages haya cambiado, y asi ejecutar de nuevo el useEffect. Si usamos "packages" en arr de dependencias hace loop infinito
    const [packagesChanged, setPackagesChanged] = useState(false)
    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axios.get(`${port}/users/${storedToken}`)
                const decodedToken = response.data.decodedToken
                console.log('Token encontrado y decodificado:', decodedToken)
            } catch (err) {
                console.error(err)
                // alert('Error al intentar obtener usuario.')
            }
        }

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }

        axios
            .get(`${port}/packages`)
            .then((response) => setPackages(response.data))
            .catch((error) => console.error(error))
    }, [port, router, packagesChanged])

    const handleDisablePackage = (selectedPackage: Package) => {
        axios
            .patch(`${port}/packages/${selectedPackage._id}`, {
                status: 'disabled',
            })
            .then(() => {
                setPackagesChanged(!packagesChanged)
            })
            .catch((err) => {
                console.error(err)
                alert('Error en la solicitud')
            })
    }

    const handleSetPendingPackage = (selectedPackage: Package) => {
        axios
            .patch(`${port}/packages/${selectedPackage._id}`, {
                status: 'pending',
            })
            .then(() => {
                setPackagesChanged(!packagesChanged)
            })
            .catch((err) => {
                console.error(err)
                alert('Error en la solicitud')
            })
    }

    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
            <Navbar />
            <section className="flex items-center flex-col h-[82%] mt-2">
                <MainContainer title={'Obtener Paquetes'} height={'600px'}>
                    <p className="text-[#55BBD1] text-center font-poppins font-normal text-sm">
                        ¿Cuántos paquetes repartirás hoy?
                    </p>
                    <p className="mt-2 border-t border-1 border-dashed border-black mb-2"></p>

                    {packages
                        .filter(
                            (p) =>
                                p.status === 'disabled' ||
                                p.status === 'pending'
                        )
                        .map((p) => (
                            <div className="border border-solid border-black h-[60px] rounded-xl my-2 flex items-center flex-row">
                                {p.status === 'pending' ? (
                                    <button
                                        onClick={() => handleDisablePackage(p)}
                                    >
                                        <CheckboxCheck className="w-6 ml-4 h-fit fill-[#AEE3EF]" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleSetPendingPackage(p)
                                        }
                                    >
                                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                                    </button>
                                )}

                                <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                                <div className="ml-4 text-xs">
                                    <p>{p.address}</p>
                                    {/* <p>CABA</p> */}
                                </div>
                            </div>
                        ))}
                </MainContainer>
            </section>

            <div className="mb-4 mt-5 flex justify-center">
                <Link href={'/working-day'}>
                    <button
                        type="submit"
                        className="w-80 py-1 bg-[#F4C455] rounded-full font-poppins font-bold"
                    >
                        Iniciar Jornada
                    </button>
                </Link>
            </div>
        </main>
    )
}
