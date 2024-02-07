'use client'
import React, { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { TriangleDownArrow } from '@/commons/icons/TriangleDownArrow'
import { PlusIcon } from '@/commons/icons/PlusIcon'
import { CircularProgressbar } from 'react-circular-progressbar'
import { DateTime } from 'luxon'
import { fiveDays, injectTime, getPreviousFiveDays, getNextFiveDays } from '@/utils/calendar'
import Link from 'next/link'
import MainContainer from '@/commons/MainContainer'
import axiosInstance from '../../../axiosConfig'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { DayData, UserData, Package, DateObject, User } from '@/types/types'
import { setMonth } from '@/utils/setMonth'
import { setData, setSelectedDay } from '@/store/slice/dbData/dataSlice'
import { handleDisplayPackages } from '@/utils/handlePackages'

export default function ManageOrders() {
    const [renderedDays, setRenderedDays] = useState<DayData[]>([])
    const { usersData, data: packages, selectedDay } = useSelector((store: any) => store.dbDataReducer)

    const dispatch = useDispatch()
    const { loginUserData } = useSelector((store: any) => store.userReducer)

    const activeUsers = usersData?.filter((user: UserData) => user.status !== 'disabled' && user.role === 'delivery').length

    const totalUsers = usersData?.filter((user: UserData) => user.role === 'delivery').length

    const deliveredPackages = packages?.filter((p: Package) => p.status === 'delivered' && handleDisplayPackages(p, selectedDay, false)).length

    const totalPackages = packages?.filter((p: Package) => handleDisplayPackages(p, selectedDay, false)).length
    const packagesPercentage = isNaN(deliveredPackages / totalPackages) ? 0 : Math.round((deliveredPackages / totalPackages) * 100)
    const usersPercentage = isNaN(activeUsers / totalUsers) ? 0 : Math.round((activeUsers / totalUsers) * 100)

    const router = useRouter()

    // 01-12-2015

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

        axiosInstance
            .get(`/packages`)
            .then((response) => {
                dispatch(setData(response.data))
            })
            .catch((error) => console.error(error))

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }
    }, [router])

    const now = DateTime.now().toLocal()
    const formattedDate = now.toFormat('dd/MM/yy')
    const days = fiveDays(formattedDate)
    injectTime(now, days)

    useEffect(() => {
        setRenderedDays(days)
    }, [])

    const classBeforeToday = 'flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5 cursor-pointer'
    const classToday = 'flex flex-col items-center border border-solid border-black rounded-xl w-[42px] m-0.5 bg-[#F4C455] cursor-pointer'
    const classAfterToday = 'flex flex-col items-center border rounded-xl w-[42px] m-0.5 bg-[#626262] bg-opacity-[20%]'

    const handlePreviousDays = () => {
        const previousDays = getPreviousFiveDays(renderedDays)
        setRenderedDays(previousDays)
        injectTime(now, previousDays)
    }

    const handleNextDays = () => {
        const nextDays = getNextFiveDays(renderedDays)
        setRenderedDays(nextDays)
        injectTime(now, nextDays)
    }

    const handleSelectDay = (e: any) => {
        const day = e.info.c.day.toString().length === 1 ? `0${e.info.c.day.toString()}` : e.info.c.day
        const month = e.info.c.month.toString().length === 1 ? `0${e.info.c.month.toString()}` : e.info.c.month

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(`${month}-${day}-${e.info.c.year}`)
        selectedDate.setHours(0, 0, 0, 0)

        if (new Date().getTime() >= selectedDate.getTime()) {
            dispatch(
                setSelectedDay({
                    stringDate: `${day}/${month}/${e.info.c.year}`,
                    date: e.info.c,
                })
            )
        }
    }

    let month
    let secondMonth
    const handleDisplayMonth = () => {
        renderedDays?.map((e: any) => {
            const date = renderedDays[0]?.info as DateObject

            if (date.c?.month === e?.info?.c?.month) {
                month = setMonth(date.c?.month)
            } else {
                secondMonth = setMonth(e?.info?.c?.month)
            }
        })
    }

    handleDisplayMonth()

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center mt-9">
                <MainContainer title={'Gestionar pedidos'} height={'560px'}>
                    <div className="flex">
                        <img src={loginUserData?.user.iconUrl} alt="admin" className=" w-[56px] h-[58px]" style={{ borderRadius: '600px' }} />
                        {/* <Image src={adminLogo} alt="Admin Logo" width={57} /> */}
                        <div className="flex flex-col ml-[20px]">
                            <h1 className="text-base font-poppins font-bold">¡Hola Admin!</h1>
                            <h3 className="text-sm font-poppins font-light">Estos son los pedidos del día</h3>
                        </div>
                    </div>

                    <div className={`flex flex-col mt-8 items-center border border-solid border-black rounded-xl`}>
                        {month && secondMonth ? (
                            <div className="flex justify-between w-[250px] border-b-2 border-[#55BBD1] border-dotted">
                                <h1 className="text-base font-poppins font-bold  mt-1">{month}</h1>

                                <h1 className="text-base font-poppins text-gray-500 mt-1">{secondMonth}</h1>
                            </div>
                        ) : (
                            <h1 className="text-base font-poppins font-bold border-b-2 border-[#55BBD1] border-dotted w-[250px] mt-1">{month}</h1>
                        )}

                        <div>
                            <div className="flex my-2">
                                <TriangleDownArrow className="rotate-90 m-auto w-[20px]" onClick={handlePreviousDays} />
                                {renderedDays.map((day) => {
                                    return (
                                        <div
                                            key={day.number}
                                            className={`${day.time === 'before' ? classBeforeToday : ''} ${
                                                selectedDay &&
                                                selectedDay.date.month ===
                                                    // @ts-expect-error -- no borrar :)🐷
                                                    day.info.c.month &&
                                                selectedDay.date.day ===
                                                    // @ts-expect-error -- no borrar :)🐷
                                                    day.info.c.day &&
                                                selectedDay.date.year ===
                                                    // @ts-expect-error -- no borrar :)🐷
                                                    day.info.c?.year
                                                    ? classToday
                                                    : !selectedDay && day.time === 'today'
                                                      ? classToday
                                                      : classBeforeToday
                                            } ${day.time === 'after' ? classAfterToday : ''}`}
                                            onClick={() => handleSelectDay(day)}
                                        >
                                            <h3 className={`text-lg font-poppins font-normal ${day.time === 'after' ? 'text-[#626262]' : ''}`}>{day.day}</h3>
                                            <h1 className={`text-xl font-poppins font-bold ${day.time === 'after' ? 'text-[#626262]' : ''}`}>{day.number}</h1>
                                        </div>
                                    )
                                })}
                                <TriangleDownArrow className="rotate-[-90deg] m-auto w-[20px]" onClick={handleNextDays} />
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col items-center border border-solid mt-6 border-black rounded-xl`}>
                        <div className="flex justify-between border-b-2 border-[#55BBD1] border-dotted w-[250px] mb-4">
                            <h1 className="text-base font-poppins font-bold mt-1">Detalles</h1>
                            <div className="flex">
                                <h2 className="text-base font-poppins font-medium mt-1">{selectedDay ? selectedDay?.stringDate : formattedDate}</h2>
                            </div>
                        </div>
                        <div className="flex justify-between w-[250px] mb-4">
                            <CircularProgressbar className="w-[75px] h-[75px]" value={usersPercentage} text={`${usersPercentage}%`} />
                            <div>
                                <h1 className="text-sm font-poppins font-bold">Repartidores</h1>
                                <h3 className="text-xs font-poppins font-light">{`${activeUsers}/${totalUsers} Habilitados`}</h3>
                                <div className="flex mt-1">
                                    {usersData?.slice(0, 3)?.map((user: User) => {
                                        if (user.role === 'delivery')
                                            return <img src={user.iconUrl} alt="Delivery Logo" width={26} height={26} className="rounded-full" />
                                    })}
                                </div>
                            </div>
                            <Link href={'/deliveries'}>
                                <button className="bg-[#F4C455] text-sm py-1 px-3 rounded-full h-[28px] mt-[37px] font-poppins font-medium">Ver</button>
                            </Link>
                        </div>
                        <div className="flex justify-between border-b-2 border-[#55BBD1] border-dotted w-[250px] mb-3"></div>
                        <div className="flex justify-between w-[250px] mb-4">
                            <CircularProgressbar className="w-[75px] h-[75px]" value={packagesPercentage} text={`${packagesPercentage}%`} />

                            <div>
                                <h1 className="text-sm font-poppins font-bold">Paquetes</h1>
                                <h3 className="text-xs font-poppins font-light">{`${deliveredPackages}/${totalPackages} Repartidos`}</h3>
                                <div className="flex">
                                    {' '}
                                    <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#55BBD1] rounded-full">
                                        <h1 className="text-[12px] text-white font-poppins font-semibold">
                                            {
                                                packages?.filter((p: Package) => {
                                                    return handleDisplayPackages(p, selectedDay, false)
                                                }).length
                                            }
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <Link href={'/packages'}>
                                <button className="bg-[#F4C455] text-sm py-1 px-3 rounded-full h-[28px] mt-[37px] font-poppins font-medium">Ver</button>
                            </Link>
                        </div>
                    </div>
                    <br />
                    <div className="mt-4">
                        <Link href={'/add-packages'}>
                            <button className="bg-[#F4C455] py-1 w-[280px] rounded-full font-poppins font-medium">
                                <div className="flex justify-center items-center">
                                    <h1 className="mr-2">Nuevo paquete</h1>
                                    <PlusIcon className="w-[20px]" />
                                </div>
                            </button>
                        </Link>
                    </div>
                </MainContainer>
            </section>
        </div>
    )
}
