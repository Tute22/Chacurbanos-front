'use client'
import React, { ReactNode } from 'react'
import { LeftArrowIcon } from './icons/LeftArrowIcon'
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

    const handleBack = () => {
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
                    pathname !== '/manage-orders' && (
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
                className={`bg-white rounded-lg p-4 w-80 mt-[-20px] flex flex-col shadow-md font-poppins font-medium`}
            >
                {children}
            </div>
        </section>
    )
}

export default MainContainer
