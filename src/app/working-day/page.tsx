'use client'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { TriangleDownArrow } from '@/commons/icons/TriangleDownArrow'
import { TrashIcon } from '@/commons/icons/TrashIcon'
import box from '../../../public/Box.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../axiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPackage } from '@/store/slice/dbData/dataSlice'
import { Package } from '@/types/types'
import Spinner from '@/commons/Spinner'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function WorkingDay() {
    const router = useRouter()
    const dispatch = useDispatch()
    // Donde guardaremos todos los paquetes
    const [packages, setPackages] = useState<Package[]>([])
    // Este estado es necesario para chequear que el estado de packages haya cambiado, y asi ejecutar de nuevo el useEffect. Si usamos "packages" en arr de dependencias hace loop infinito
    const [packagesChanged, setPackagesChanged] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { loginUserData } = useSelector((store: any) => store.userReducer)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/users/${storedToken}`
                )
                const decodedToken = response.data
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

        axiosInstance
            .get(`/packages`)
            .then((response) => {
                const filteredPackages = response.data.filter(
                    (e: any) => e.deliveredBy === loginUserData.user._id
                )
                setPackages(filteredPackages)
            })
            .catch((error) => console.error(error))
    }, [router, packagesChanged])

    const handleCancelPackage = (selectedPackage: Package) => {
        axiosInstance
            .patch(`/packages/${selectedPackage._id}`, {
                status: 'pending',
            })
            .then(() => {
                setPackagesChanged(true)
                toast.info('Paquete cancelado')
            })
            .catch((err) => {
                console.error(err)
                toast.error('Error en la solicitud')
            })
    }

    const handleDeliveryPackage = (selectedPackage: Package) => {
        axiosInstance
            .patch(`/packages/${selectedPackage._id}`, {
                status: 'in progress',
            })
            .then(() => {
                setPackagesChanged(true)
                toast.success('Paquete asignado!')
            })
            .catch((err) => {
                console.error(err)
                toast.error('Error en la solicitud')
            })
    }

    const handleDispatchSelectedPackage = (selectedPackage: Package) => {
        dispatch(setSelectedPackage(selectedPackage))
    }

    const handleClick = () => {
        setIsLoading(true)
    }

    // se agrego solo para poder ir a la vista del mapa sin tener que cancelar e iniciar de nuevo, click en la fotito de la caja
    const handleMap = () => {
        router.push('/distribution')
    }

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
            <div className="flex flex-col justify-center items-center">
                <section className="bg-white w-80 h-[275px] mt-6 m-4 rounded-xl p-4 shadow-md ">
                    <div className="flex justify-between items-center font-poppins font-extrabold text-lg mb-3.5">
                        <div>Repartos pendientes</div>
                        <TriangleDownArrow className="w-6 ml-[3px]" />
                    </div>

                    <div className="overflow-y-auto h-[215px] w-[18.5rem] pr-[7px]">
                        {packages
                            .filter(
                                (p) =>
                                    (p.deliveredBy ===
                                        loginUserData?.user._id &&
                                        p.status === 'pending') ||
                                    p.status === 'in progress'
                            )
                            .map((p) => (
                                <div
                                    key={p._id}
                                    className={`border border-solid border-black rounded-xl mb-3`}
                                >
                                    <div className="flex py-[10px] pl-[1px]">
                                        <Image
                                            className="cursor-pointer"
                                            onClick={handleMap}
                                            src={box}
                                            alt="box"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="flex-col border-l-2 border-black border-dotted">
                                            <div className="ml-2 font-poppins font-medium">
                                                <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                                                    {'#' +
                                                        p._id
                                                            .split('')
                                                            .reverse()
                                                            .join('')
                                                            .slice(0, 5)}
                                                </div>
                                                <div className="text-sm">
                                                    {p.address}
                                                </div>
                                                {/* <div className="text-sm">CABA</div> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-grow items-end">
                                            <div
                                                className={`mb-4 text-xs font-poppins font-bold ${
                                                    p.status === 'pending'
                                                        ? 'bg-[#232324] bg-opacity-20'
                                                        : p.status ===
                                                            'in progress'
                                                          ? 'bg-[#8AB2FF]'
                                                          : ''
                                                } py-0.5 px-4 rounded-l-2xl`}
                                            >
                                                {p.status === 'pending'
                                                    ? 'PENDIENTE'
                                                    : p.status === 'in progress'
                                                      ? 'EN CURSO'
                                                      : ''}
                                            </div>
                                            <div className="pr-3">
                                                {p.status === 'in progress' ? (
                                                    <button
                                                        onClick={() => {
                                                            handleCancelPackage(
                                                                p
                                                            )
                                                        }}
                                                    >
                                                        <TrashIcon className="w-6 text-red" />
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={'/distribution'}
                                                    >
                                                        <button
                                                            className="bg-[#F4C455] text-sm py-1 px-3 rounded-full font-poppins font-medium"
                                                            disabled={packages.some(
                                                                (e: any) =>
                                                                    e.status ===
                                                                    'in progress'
                                                            )}
                                                            onClick={() => {
                                                                handleDeliveryPackage(
                                                                    p
                                                                )
                                                                handleDispatchSelectedPackage(
                                                                    p
                                                                )
                                                            }}
                                                        >
                                                            Iniciar
                                                        </button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
                <br />

                <section className="bg-white w-80 h-[300px] rounded-xl m-4 p-4 shadow-md">
                    <div className="flex justify-between items-center font-poppins font-extrabold text-lg mb-2">
                        <div>Historial de reportes</div>
                        <TriangleDownArrow className="w-6 ml-[3px]" />
                    </div>
                    <div className="text-[#55BBD1] font-poppins font-light text-sm mb-3">
                        {
                            packages.filter(
                                (p) =>
                                    p.status === 'delivered' &&
                                    p.deliveredBy === loginUserData?.user._id
                            ).length
                        }{' '}
                        paquetes entregados
                    </div>

                    <div className="overflow-y-auto h-[215px] w-[18.5rem] pr-[7px]">
                        {packages
                            .filter(
                                (p) =>
                                    p.status === 'delivered' &&
                                    p.deliveredBy === loginUserData?.user._id
                            )
                            .map((p) => (
                                <div
                                    className={`border border-solid border-black rounded-xl mb-3`}
                                >
                                    <div className="flex py-[10px] pl-[1px]">
                                        <Image
                                            src={box}
                                            alt="box"
                                            width={50}
                                            height={50}
                                        />
                                        <div className="flex-col border-l-2 border-black border-dotted">
                                            <div className="ml-2 font-poppins font-medium">
                                                <div className="text-[#55BBD1] font-poppins font-semibold text-sm">
                                                    {'#' +
                                                        p._id
                                                            .split('')
                                                            .reverse()
                                                            .join('')
                                                            .slice(0, 5)}
                                                </div>
                                                <div className="text-sm">
                                                    {p.address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-grow items-end">
                                            <div className="mb-4 text-xs font-poppins font-bold bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl">
                                                {p.status === 'delivered' &&
                                                    'ENTREGADO'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
                <br />
                <div>
                    <Link href={'/get-packages'}>
                        <button
                            onClick={handleClick}
                            className="bg-[#F4C455] text-lg py-1 w-80 rounded-full font-poppins font-medium mt-2"
                        >
                            {!isLoading ? 'Obtener paquetes' : <Spinner />}
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
