'use client'
import { TriangleDownArrow } from '@/commons/icons/TriangleDownArrow'
import { Navbar } from '@/components/Navbar'
import box from '../../../../public/Box.png'
import Image from 'next/image'
import MainContainer from '@/commons/MainContainer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../../../../axiosConfig'
import { setSelectedUserData } from '@/store/slice/userData/userSlice'
import { Package } from '@/types/types'
import { setData, setUsersData } from '@/store/slice/dbData/dataSlice'
import { handleDisplayPackages } from '@/utils/handlePackages'
import { toast } from 'react-toastify'
import Modal from '@/commons/modal'

export default function DeliveryProfile() {
    const router = useRouter()
    const [usersChanged, setUsersChanged] = useState(false)
    const { data, selectedDay } = useSelector((store: any) => store.dbDataReducer)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const { selectedUserData } = useSelector((store: any) => store.userReducer)
    const deliveredPackages = data?.filter(
        (p: Package) => p.status === 'delivered' && p.deliveredBy === selectedUserData._id && handleDisplayPackages(p, selectedDay, false)
    )
    const pendingPackages = data
        ?.filter((p: Package) => p.deliveredBy === selectedUserData._id && handleDisplayPackages(p, selectedDay, true))
        .filter((p: Package) => p.status === 'pending' || p.status === 'in progress')

    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${storedToken}`)
                const decodedToken = response.data
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

        axiosInstance
            .get(`/users/user/${selectedUserData?._id}`)
            .then((response) => {
                dispatch(setSelectedUserData(response.data))
            })
            .catch((error) => console.log(error))

        axiosInstance
            .get(`/users`)
            .then((response) => {
                dispatch(setUsersData(response.data))
            })
            .catch((error) => console.error(error))
    }, [router, usersChanged])

    const handleUserStatus = () => {
        axiosInstance
            .patch(`/users/${selectedUserData._id}`, {
                status: selectedUserData?.status === 'disabled' ? 'enabled' : 'disabled',
            })
            .then((response) => {
                dispatch(setSelectedUserData(response.data))
                setUsersChanged(!usersChanged)
            })
            .catch((error) => console.log(error))

        if (selectedUserData.status === 'disabled') {
            const pendingUserPackages = data?.filter((p: Package) => p.deliveredBy === selectedUserData._id && p.status === 'pending')

            pendingUserPackages?.length &&
                pendingUserPackages?.map((p: Package) => {
                    axiosInstance
                        .patch(`/packages/${p._id}`, {
                            deliveredBy: '',
                            status: 'disabled',
                        })
                        .then(() => {
                            axiosInstance
                                .get(`/packages`)
                                .then((response) => {
                                    dispatch(setData(response.data))
                                    console.log('Solicitud con éxito')
                                })
                                .catch((error) => console.error(error))
                        })
                        .catch((err) => {
                            console.error(err)
                            toast.error('Error en la solicitud')
                        })
                })
        }
    }

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <MainContainer title={'Perfil del repartidor'} height="">
                <div className="flex items-center">
                    <img src={selectedUserData?.iconUrl} alt="delivery" className=" w-[56px] h-[58px]" style={{ borderRadius: '600px' }} />

                    {/* Container con nombre, estado y toggle */}
                    <div className="pl-2 flex justify-between w-64 items-center ml-1">
                        {/* Container con nombre y estado */}
                        <div>
                            <p className="text-black text-[13px] mb-[3px] ml-[0.5px] font-poppins font-normal">
                                <strong className="font-poppins font-bold text-base">{selectedUserData?.name}</strong>
                            </p>

                            <div
                                className={`mb-1 text-[10px] text-black font-poppins font-bold ${
                                    selectedUserData?.status === 'enabled' ? 'bg-[#8EEE86]' : 'bg-[#232324] bg-opacity-20'
                                } py-[1px] px-3 rounded-2xl tracking-wide`}
                            >
                                {selectedUserData?.status === 'enabled' ? 'HABILITADO' : 'DESHABILITADO'}
                            </div>
                        </div>

                        {/* Container con toggle */}
                        <div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                {/* onClick={() => handleUserStatus()} */}
                                <input type="checkbox" value="" className="sr-only peer" onClick={toggleModal} />
                                <Modal
                                    title={'Estás seguro'}
                                    subtitle={'Cambiará el estado de este repartidor'}
                                    isOpen={modalIsOpen}
                                    handle={handleUserStatus}
                                    element={null}
                                    toggleModal={toggleModal}
                                />
                                <div
                                    className={`w-11 h-6 border-[1px] border-solid border-[#55BBD1]  rounded-full  after:absolute after:top-[2px]  after:border-gray-300 after:border after:rounded-full ${
                                        selectedUserData?.status === 'disabled' ? 'after:start-[2px]' : 'after:end-[2px]'
                                    } after:bg-[#F4C455] after:h-5 after:w-5 after:transition-all ring:[#F4C455]`}
                                ></div>
                            </label>
                        </div>
                    </div>
                </div>
            </MainContainer>

            {/* Container con info de repartos pendientes */}
            <div className="p-4 w-80 mx-auto mt-3 bg-white rounded-[11px] shadow-white-distribution-container ">
                <div className="w-full">
                    <div className="flex justify-between ">
                        <h3 className="text-lg font-poppins font-bold">Repartos pendientes</h3>
                        <TriangleDownArrow className=" w-[18px] h-6  ml-[3px] -rotate-90" />
                    </div>

                    {pendingPackages?.length ? (
                        <div className="mt-4">
                            {pendingPackages?.map((p: Package) => (
                                <div key={p._id} className={`border border-solid border-black rounded-xl mb-3 `}>
                                    <div className="flex py-[10px] pl-[1px]">
                                        <Image src={box} alt="box" width={50} height={50} />
                                        <div className="flex-col border-l-2 border-black border-dotted">
                                            <div className="ml-2 font-poppins font-medium">
                                                <div className="text-[#55BBD1] font-poppins font-semibold text-sm">{'#' + p._id.slice(19)}</div>
                                                <div className="text-sm">{`${p.address.slice(0, 14)}...`}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-grow items-end">
                                            <div
                                                className={`mb-4 text-xs font-poppins font-bold ${
                                                    p.status === 'pending' ? 'bg-[#F4C455]' : 'bg-[#8AB2FF]'
                                                }  py-0.5 px-4 rounded-l-2xl`}
                                            >
                                                {p.status === 'pending' ? 'PENDIENTE' : 'EN PROGRESO'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-1 text-[13px] font-poppins font-normal">Sin repartos</p>
                    )}
                </div>
            </div>

            <div className="p-4 w-80 mx-auto mt-3 bg-white rounded-[11px] shadow-white-distribution-container max-h-[385.5px] ">
                <div className="w-full">
                    <div className="flex justify-between ">
                        <h3 className="text-lg font-poppins font-bold">Historial de repartos</h3>
                        <TriangleDownArrow className=" w-[18px] h-6  ml-[3px] " />
                    </div>
                    <p className="mt-1 text-[13px] font-poppins font-normal mb-5">{deliveredPackages?.length} paquetes entregados</p>
                </div>
                {/* Containers de paquetes entregados */}
                <main className="max-h-[280.5px] scroll-content ">
                    {deliveredPackages?.map((p: Package) => (
                        <div key={p._id} className={`border border-solid border-black rounded-xl mb-3 `}>
                            <div className="flex py-[10px] pl-[1px]">
                                <Image src={box} alt="box" width={50} height={50} />
                                <div className="flex-col border-l-2 border-black border-dotted">
                                    <div className="ml-2 font-poppins font-medium">
                                        <div className="text-[#55BBD1] font-poppins font-semibold text-sm">{'#' + p._id.slice(19)}</div>
                                        <div className="text-sm">{`${p.address.slice(0, 14)}...`}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow items-end">
                                    <div className="mb-4 text-xs font-poppins font-bold bg-[#8EEE86] py-0.5 px-4 rounded-l-2xl">ENTREGADO</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}
