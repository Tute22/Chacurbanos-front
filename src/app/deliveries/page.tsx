'use client'

import { ChevronArrowDown } from '@/commons/icons/ChevronArrowDown'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'
import { DateTime } from 'luxon'
import MainContainer from '@/commons/MainContainer'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUserData } from '@/store/slice/userData/userSlice'
import { Package, User } from '@/types/types'
import axiosInstance from '../../../axiosConfig'
import { handleDisplayPackages } from '@/utils/handlePackages'
import { setMonth } from '@/utils/setMonth'

export default function Deliveries() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { usersData, data, selectedDay } = useSelector((store: any) => store.dbDataReducer)

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
    }, [router])

    return (
        <main className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center mt-5">
                <MainContainer title={'Repartidores'} height={'600px'}>
                    <div className="flex">
                        <div>
                            <h1 className="text-black text-xl mb-1 mt-2 font-poppins font-bold">{setMonth(selectedDay?.date?.month)}</h1>
                            <p className="border-dashed border-[#F4C455] border-t w-56"></p>
                        </div>
                        <div
                            className={`flex flex-col items-center border border-solid border-[#F4C455] rounded-xl w-[42px] text-[#55BBD1] shadow-lg py-1 px-7`}
                        >
                            <h1 className="text-lg font-poppins font-normal">
                                {selectedDay?.stringDate && DateTime.fromFormat(selectedDay?.stringDate, 'dd/MM/yyyy').weekdayShort}
                            </h1>
                            <h3 className="text-xl font-poppins font-bold">{selectedDay?.date?.day}</h3>
                        </div>
                    </div>

                    <div className="overflow-y-auto  w-[18.5rem] pr-[7px]">
                        {usersData
                            ?.filter((usr: User) => usr.role !== 'admin')
                            .map((user: User) => {
                                const totalPackages = data?.filter((p: Package) => p.deliveredBy === user._id && handleDisplayPackages(p, selectedDay, true))
                                const deliveredPackages = totalPackages?.filter((p: any) => p.status === 'delivered').length
                                const usersPercentage = isNaN(deliveredPackages / totalPackages.length)
                                    ? 0
                                    : Math.round((deliveredPackages / totalPackages.length) * 100)

                                return (
                                    <>
                                        <Link href={`/delivery-profile/${user._id}`} key={user._id}>
                                            <div className="flex gap-5 items-center justify-between" onClick={() => dispatch(setSelectedUserData(user))}>
                                                <div className="flex items-center">
                                                    <CircularProgressbar className="w-[75px] h-[75px]" value={usersPercentage} text={`${usersPercentage}%`} />
                                                    <div className="mb-2 ml-2">
                                                        <h2 className="mb-1 text-lg font-poppins font-semibold">{user.name}</h2>
                                                        <h3
                                                            className={`text-xs ${
                                                                user.day === 'finish' && user.status !== 'disabled'
                                                                    ? 'bg-[#8EEE86]'
                                                                    : user.day === 'pending' && user.status !== 'disabled'
                                                                      ? 'bg-[#F4C455]'
                                                                      : user.day === 'in progress' && user.status !== 'disabled'
                                                                        ? 'bg-[#8AB2FF]'
                                                                        : 'bg-[#232324] bg-opacity-20'
                                                            } px-2 rounded-full font-poppins font-bold text-left`}
                                                        >
                                                            {user.day === 'finish' && user.status !== 'disabled'
                                                                ? 'ENTREGADO'
                                                                : user.day === 'pending' && user.status !== 'disabled'
                                                                  ? 'DISPONIBLE'
                                                                  : user.day === 'in progress' && user.status !== 'disabled'
                                                                    ? 'EN CURSO'
                                                                    : 'DESHABILITADO'}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <img
                                                    src={user.iconUrl}
                                                    alt="delivery"
                                                    className=" w-[56px] h-[58px]"
                                                    style={{
                                                        borderRadius: '600px',
                                                    }}
                                                />
                                            </div>
                                            <p className="my-5 border-dashed border-black border-t w-full"></p>
                                        </Link>
                                    </>
                                )
                            })}
                    </div>

                    <div className="flex justify-center">
                        <ChevronArrowDown className="mt-2" />
                    </div>
                </MainContainer>
            </section>
        </main>
    )
}
