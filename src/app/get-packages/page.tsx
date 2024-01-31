'use client'
import MainContainer from '@/commons/MainContainer'
import { CheckboxCheck } from '@/commons/icons/CheckboxCheck'
import { CheckboxEmpty } from '@/commons/icons/CheckboxEmpty'
import { Navbar } from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '../../../axiosConfig'
import { Package } from '@/types/types'
import Spinner from '@/commons/Spinner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '@/store/slice/dbData/dataSlice'

export default function GetPackages() {
    // Este estado es necesario para chequear que el estado de redux de packages haya cambiado, y asi ejecutar de nuevo el useEffect. Si usamos "packages" en arr de dependencias hace loop infinito
    const [packagesChanged, setPackagesChanged] = useState(false)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { loginUserData } = useSelector((store: any) => store.userReducer)

    const dispatch = useDispatch()
    const { data: packages } = useSelector((store: any) => store.dbDataReducer)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${storedToken}`)
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
                const filteredPackages = response.data?.filter(
                    (e: any) => (e.status !== 'delivered' && e.deliveredBy === '') || e.deliveredBy === loginUserData.user._id
                )

                dispatch(setData(filteredPackages))
            })
            .catch((error) => console.error(error))
    }, [router, packagesChanged])

    const handleDisablePackage = (selectedPackage: Package) => {
        axiosInstance
            .patch(`/packages/${selectedPackage._id}`, {
                status: 'disabled',
                deliveredBy: '',
            })
            .then(() => {
                setPackagesChanged(!packagesChanged)
            })
            .catch((err) => {
                console.error(err)
                toast.error('Error en la solicitud')
            })
    }

    const handleSetPendingPackage = (selectedPackage: Package) => {
        axiosInstance
            .patch(`/packages/${selectedPackage._id}`, {
                status: 'pending',
                deliveredBy: loginUserData.user._id,
            })
            .then(() => {
                setPackagesChanged(!packagesChanged)
            })
            .catch((err) => {
                console.error(err)
                toast.error('Error en la solicitud')
            })
    }

    const handleClick = () => {
        setIsLoading(true)
        toast.info('Obtuviste paquete/s')
        router.push('/working-day')
    }

    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
            <Navbar />
            <section className="flex items-center flex-col h-[82%] mt-2">
                <MainContainer title={'Obtener Paquetes'} height={'600px'}>
                    <p className="text-[#55BBD1] text-center font-poppins font-normal text-sm">¿Cuántos paquetes repartirás hoy?</p>
                    <p className="mt-2 border-t border-1 border-dashed border-black mb-2"></p>

                    {packages?.filter((p: Package) => p.status === 'disabled' || p.status === 'pending').length === 0 ? (
                        <div className="text-[#55BBD1] font-poppins font-bold text-base mb-3 flex justify-center items-center h-full">
                            No hay paquetes para agregar
                        </div>
                    ) : null}

                    {packages
                        ?.filter((p: Package) => p.status === 'disabled' || p.status === 'pending')
                        .map((p: Package) => (
                            <div key={p._id} className="border border-solid border-black h-[60px] rounded-xl my-2 flex items-center flex-row">
                                {p.status === 'pending' ? (
                                    <button onClick={() => handleDisablePackage(p)}>
                                        <CheckboxCheck className="w-6 ml-4 h-fit fill-[#AEE3EF]" />
                                    </button>
                                ) : (
                                    <button onClick={() => handleSetPendingPackage(p)}>
                                        <CheckboxEmpty className="w-6 ml-4 h-fit" />
                                    </button>
                                )}

                                <p className="ml-3 border-dotted border-l border-black h-12 w-1"></p>
                                <div className="ml-4 text-xs">
                                    <p>{p.address}</p>
                                </div>
                            </div>
                        ))}
                </MainContainer>
            </section>

            <div className="mb-4 mt-5 flex justify-center">
                <div>
                    <button onClick={handleClick} type="submit" className="w-80 py-1 bg-[#F4C455] rounded-full font-poppins font-bold">
                        {!isLoading ? 'Iniciar Jornada' : <Spinner />}
                    </button>
                </div>
            </div>
        </main>
    )
}
