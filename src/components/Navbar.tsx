'use client'
import React from 'react'
import Image from 'next/image'
import navbarLogo from '../../public/navbarLogo.svg'
import { LogoutDoorIcon } from '@/commons/icons/LogoutDoorIcon'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/store/slice/userData/userSlice'
import { loadingDispatch } from '@/utils/loadingDispatch'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Navbar = () => {
    const pathName = usePathname()
    const router = useRouter()
    const dispatch = useDispatch()
    const loadingStates = useSelector((store: any) => store.loadingReducer)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(setUser(null))
        loadingDispatch(dispatch, loadingStates)
        toast.success('Hasta la proximaaaa')
        setTimeout(() => {
            router.push('/')
        }, 1500)
    }

    return (
        <>
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
            <nav className="h-14 bg-[#AEE3EF] shadow-nav py-2 px-8 flex justify-between">
                <Link href={'/'}>
                    {' '}
                    {/* Despues cambiar a working-day para repartidor y manage-orders para admin */}
                    <Image
                        src={navbarLogo}
                        width={56}
                        height={160}
                        alt="navbarLogo"
                    />
                </Link>
                {pathName === '/register' ? (
                    ''
                ) : (
                    <div
                        className="w-7 rounded-md cursor-pointer my-[4px] bg-[#55BBD1] shadow-logout-button flex items-center justify-center"
                        onClick={handleLogout}
                    >
                        <LogoutDoorIcon className="w-6 ml-[3px]" />
                    </div>
                )}
            </nav>
        </>
    )
}
