import { Package } from '@/types/types'
import React from 'react'

interface ModalProps {
    title: string
    subtitle: string
    isOpen: boolean
    handle: (element?: Package | null) => void
    element: Package | null
    toggleModal: () => void
}
// bg-gray-800 bg-opacity-50
export default function Modal({ title, subtitle, isOpen, handle, element, toggleModal }: ModalProps) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'bg-gray-800 bg-opacity-50' : 'hidden'}`}>
            <div className="relative w-[90%] bg-white rounded-lg shadow-lg">
                <div className="p-4 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">¿{title} 🤔?</h1>
                    <p className="mt-2">{subtitle}</p>
                </div>
                <div className="p-4 flex justify-evenly bg-gray-100 border-t border-gray-200">
                    <button
                        onClick={() => {
                            element !== null ? handle(element) : handle()
                            toggleModal()
                        }}
                        className="px-4 py-2 text-white rounded-xl bg-red-500 "
                    >
                        Si
                    </button>
                    <button onClick={() => toggleModal()} className="px-4 py-2 bg-white rounded-xl border-2 border-[#55BBD1] text-black">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
