'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import axiosInstance from '../../../axiosConfig'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Package } from '@/types/types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleMap } from '@/commons/GoogleMap'
import axios from 'axios'
import Modal from '@/commons/modal'

type LocationState = {
    lat: number | null
    lng: number | null
}

export default function Distribution() {
    const router = useRouter()
    const { selectedPackage: inProgressPackage } = useSelector((store: any) => store.dbDataReducer)
    const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState<LocationState>({ lat: null, lng: null })
    const [currentLocationStr, setCurrentLocationStr] = useState('')
    const [modalFinIsOpen, setModalFinIsOpen] = useState(false)
    const [modalCanIsOpen, setModalCanIsOpen] = useState(false)

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

        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setCurrentLocationCoordinates({ lat: latitude, lng: longitude })
                    },
                    (error) => {
                        console.error(error)
                    }
                )
            }
        }

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }

        getCurrentLocation()
    }, [router])

    const reverseGeocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocationCoordinates.lat},${currentLocationCoordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`

    console.log(reverseGeocodeURL)

    axios
        .get(reverseGeocodeURL)
        .then((response) => {
            const data = response.data
            const address = data.results[0].formatted_address
            // console.log(`Address: ${address}`);
            setCurrentLocationStr(address)
        })
        .catch((error) => {
            console.log('Error reverse geocoding:', error)
        })

    console.log('IN PROGRESS PACKAGE >>>', inProgressPackage)

    const handleCancelPackage = (selectedPackage: Package | null | undefined) => {
        if (selectedPackage) {
            axiosInstance
                .patch(`/packages/${selectedPackage?._id && selectedPackage?._id}`, {
                    status: 'pending',
                })
                .then(() => {
                    toast.info('Paquete cancelado')
                    router.push('/working-day')
                })
                .catch((err) => {
                    console.error(err)
                    toast.error('Error en la solicitud')
                })
        }
    }

    const handleCompletePackage = (selectedPackage: Package | null | undefined) => {
        if (selectedPackage) {
            axiosInstance
                .patch(`/packages/${selectedPackage?._id && selectedPackage?._id}`, {
                    status: 'delivered',
                })
                .then(() => {
                    toast.success('Paquete entregado!')
                    router.push('/working-day')
                })
                .catch((err) => {
                    console.error(err)
                    toast.error('Error en la solicitud')
                })
        }
    }

    const toggleModalFin = () => {
        setModalFinIsOpen(!modalFinIsOpen)
    }

    const toggleModalCan = () => {
        setModalCanIsOpen(!modalCanIsOpen)
    }

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            {/* distribution screen */}
            <MainContainer title={'Reparto en curso'} height="620px">
                <div className="py-1 px-[0.5px]">
                    <GoogleMap addresses={[currentLocationStr, inProgressPackage.address]} />

                    {/* Container con info de envío  */}
                    <div className="py-5 pl-[0.5px]">
                        <p className="text-black text-[13px] mb-[1px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">Destino:</strong> {inProgressPackage?.address}
                        </p>
                        <p className="text-black text-[13px] mb-[1px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">Número de paquete:</strong> {'#' + inProgressPackage._id.slice(19)}
                        </p>
                        <p className="text-black text-[13px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">Recibe:</strong> {inProgressPackage?.recipient}
                        </p>
                    </div>
                </div>

                {/* Container para botones */}
                <div className="pt-2">
                    <button className="font-poppins font-medium w-full px-4 py-2 mb-4 bg-[#F4C455] rounded-full text-stone-900" onClick={toggleModalFin}>
                        Finalizar
                    </button>

                    <Modal
                        title={'Estás seguro'}
                        subtitle={'El proceso de entrega se dará por finalizado'}
                        isOpen={modalFinIsOpen}
                        handle={handleCompletePackage}
                        element={inProgressPackage}
                        toggleModal={toggleModalFin}
                    />

                    <button
                        className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px] text-stone-900"
                        onClick={toggleModalCan}
                    >
                        Cancelar entrega
                    </button>

                    <Modal
                        title={'Estás seguro'}
                        subtitle={'Se cancelará el proceso de entrega'}
                        isOpen={modalCanIsOpen}
                        handle={handleCancelPackage}
                        element={inProgressPackage}
                        toggleModal={toggleModalCan}
                    />
                </div>
            </MainContainer>
        </div>
    )
}
