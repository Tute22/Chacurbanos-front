'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Distribution() {
    // type Package = {
    //     _id: string
    //     address: string
    //     recipient: string
    //     weight: number
    //     date: string
    //     status: string
    // }
    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT
    const { selectedPackage: inProgressPackage } = useSelector(
        (store: any) => store.dbDataReducer
    )

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axios.get(`${port}/users/${storedToken}`)
                const decodedToken = response.data.decodedToken
                console.log('Token encontrado y decodificado:', decodedToken)
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

    // const handleCancelPackage = (selectedPackage: Package) => {
    //     axios
    //         .patch(`${port}/packages/${selectedPackage?._id}`, {
    //             status: 'pending',
    //         })
    //         .then(() => {
    //             alert('Paquete cancelado')
    //             router.push('/working-day')
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             alert('Error en la solicitud')
    //         })
    // }

    // const handleCompletePackage = (selectedPackage: Package) => {
    //     axios
    //         .patch(`${port}/packages/${selectedPackage?._id}`, {
    //             status: 'delivered',
    //         })
    //         .then(() => {
    //             alert('Paquete entregado!')
    //             router.push('/working-day')
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             alert('Error en la solicitud')
    //         })
    // }

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            {/* distribution screen */}
            <MainContainer title={'Reparto en curso'} height="620px">
                <div className="py-1 px-[0.5px]">
                    <iframe
                        src={
                            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52503.699211042076!2d-58.7351501216974!3d-34.66780282629255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbf8707ca9e95%3A0x7a4b25f03463e529!2sSan%20Antonio%20de%20Padua%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700170849337!5m2!1ses-419!2sar'
                        }
                        className="h-[360px] w-full rounded-lg border border-slate-800"
                        loading="lazy"
                    ></iframe>

                    {/* Container con info de envio  */}
                    <div className="py-5 pl-[0.5px]">
                        <p className="text-black text-[13px] mb-[1px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">
                                Destino:
                            </strong>{' '}
                            {inProgressPackage?.address}
                        </p>
                        <p className="text-black text-[13px] mb-[1px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">
                                Número de paquete:
                            </strong>{' '}
                            {'#' +
                                inProgressPackage._id
                                    .split('')
                                    .reverse()
                                    .join('')
                                    .slice(0, 5)}
                        </p>
                        <p className="text-black text-[13px] font-poppins font-normal">
                            <strong className="font-poppins font-bold">
                                Recibe:
                            </strong>{' '}
                            {inProgressPackage?.recipient}
                        </p>
                    </div>
                </div>

                {/* Container para botones */}
                <div className="pt-2">
                    <button
                        className="font-poppins font-medium w-full px-4 py-2 mb-4 bg-[#F4C455] rounded-full text-stone-900"
                        // onClick={() => {
                        //     handleCompletePackage(inProgressPackage)
                        // }}
                    >
                        Finalizar
                    </button>
                    <button
                        className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px] text-stone-900"
                        // onClick={() => {
                        //     handleCancelPackage(inProgressPackage)
                        // }}
                    >
                        Cancelar entrega
                    </button>
                </div>
            </MainContainer>
        </div>
    )
}
