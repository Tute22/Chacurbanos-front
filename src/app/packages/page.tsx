'use client'
import { TrashIcon } from '@/commons/icons/TrashIcon'
import { ChevronArrowDown } from '@/commons/icons/ChevronArrowDown'
import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import box from '../../../public/Box.png'
import MainContainer from '@/commons/MainContainer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function Packages() {
    type Package = {
        _id: string
        address: string
        recipient: string
        weight: number
        date: string
        status: string
    }

    const port = process.env.NEXT_PUBLIC_PORT
    const { data } = useSelector((store: any) => store.dbDataReducer)
    const [packagesChanged, setPackagesChanged] = useState(false)

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
                // alert('Error al intentar obtener usuario.')
            }
        }

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }
    }, [port, router, packagesChanged])

    const handleDelete = (element: Package) => {
        axios
            .delete(`${port}/packages/${element._id}`)
            .then(() => {
                setPackagesChanged(!packagesChanged)
                alert('Paquete eliminado correctamente')
            })
            .catch((error) => console.error(error))
    }

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <MainContainer title={'Paquetes'} height={'600px'}>
                <div className="flex">
                    <div>
                        <h1 className="text-black font-bold text-xl mb-1 mt-2">
                            Enero
                        </h1>
                        <p className="border-dashed border-[#F4C455] border-t w-60"></p>
                    </div>
                    <div
                        className={`flex flex-col items-center border border-solid border-[#F4C455] rounded-xl w-[42px] text-[#55BBD1] shadow-lg py-2 px-7`}
                    >
                        <h3 className="text-lg font-poppins font-normal">
                            mie
                        </h3>
                        <h1 className="text-xl font-poppins font-bold">03</h1>
                    </div>
                </div>

                <div>
                    <h1 className="text-black font-bold mb-5">
                        {
                            data?.filter(
                                (p: Package) =>
                                    p.status === 'pending' ||
                                    p.status === 'disabled'
                            ).length
                        }{' '}
                        paquetes
                    </h1>
                </div>

                <div className=" h-96 overflow-y-auto">
                    {data
                        ?.filter(
                            (p: Package) =>
                                p.status === 'pending' ||
                                p.status === 'disabled'
                        )
                        .map((element: Package, index: number) => (
                            <div
                                key={index}
                                className={`border border-solid border-black rounded-xl mb-4 `}
                            >
                                <div className="flex py-[10px] pl-[1px]">
                                    <Image src={box} alt="box" width={50} />
                                    <div className="flex-col border-l-2 border-black border-dotted">
                                        <div className="ml-2 font-poppins font-medium">
                                            <h1 className="text-[#55BBD1] font-poppins font-semibold text-sm">
                                                {'#' +
                                                    element._id
                                                        .split('')
                                                        .reverse()
                                                        .join('')
                                                        .slice(0, 5)}
                                            </h1>
                                            <p className="text-sm text-black">
                                                {element.address.split(',')[0]},
                                            </p>
                                            <p className="text-sm text-black">
                                                {element.address.split(',')[1]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow items-end pr-3 mt-4">
                                        <button
                                            onClick={() => {
                                                handleDelete(element)
                                            }}
                                        >
                                            {
                                                <TrashIcon className="w-6 text-red" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="flex justify-center">
                    <button>
                        {<ChevronArrowDown className="w-10 mt-6 text-black" />}
                    </button>
                </div>
            </MainContainer>
        </div>
    )
}
