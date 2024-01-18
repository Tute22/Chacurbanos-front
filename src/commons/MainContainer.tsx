'use client'
import React, { ReactNode } from 'react'
import { LeftArrowIcon } from './icons/LeftArrowIcon'
import { useDispatch, useSelector } from 'react-redux'
import {
    setGetPackagesLoading,
    setLoginLoading,
    setRegisterLoading,
} from '@/store/slice/isLoading/loadingSlice'
import { usePathname, useRouter } from 'next/navigation'

interface MainContainerProps {
    title: string
    children: ReactNode
    height: string
}

const MainContainer: React.FC<MainContainerProps> = ({
    title,
    children,
    height,
}) => {
    const pathname = usePathname()
    const router = useRouter()

    const dispatch = useDispatch()
    const loadingStates = useSelector((store: any) => store.loadingReducer)

    const loadingActions: Record<string, (payload: boolean) => any> = {
        ['loginLoading']: setLoginLoading,
        ['registerLoading']: setRegisterLoading,
        ['getPackagesLoading']: setGetPackagesLoading,
    }

    const handleBack = () => {
        for (const key in loadingStates) {
            const actionCreator = loadingActions[`${key}`]
            if (actionCreator) {
                dispatch(actionCreator(false))
            }
        }
        router.back()
    }

    const containerStyle = {
        height: height,
    }

    return (
        <section className="flex items-center flex-col mt-7">
            <div className="bg-[#55BBD1] rounded-lg p-4 w-80 h-[80px] text-white flex flex-wrap justify-between shadow-md">
                {pathname !== '/login' &&
                    pathname !== '/' &&
                    pathname !== '/manage-orders' &&
                    pathname !== '/declaration' && (
                        <LeftArrowIcon
                            onClick={handleBack}
                            className="w-8 ml-[3px] absolute mx-auto cursor-pointer"
                        />
                    )}
                <div className="w-fit mx-auto">
                    <h3 className="text-lg font-poppins font-semibold h-[32px] flex items-center">
                        {title}
                    </h3>
                </div>
            </div>
            <div
                style={containerStyle}
                className={`bg-white rounded-lg p-4 w-80 mt-[-20px] flex flex-col shadow-md font-poppins font-medium overflow-y-auto`}
            >
                {children}
            </div>
        </section>
    )
}

export default MainContainer
