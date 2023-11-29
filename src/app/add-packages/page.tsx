'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import { useValidations } from '@/hooks/validationHooks'
import { useState } from 'react'

export default function GetPackages() {
    const {
        formValues,
        errors,
        validateAddress,
        validateName,
        validatePackage,
        setAddress,
        setName,
        setPackageWeight,
        isAddPackageComplete,
    } = useValidations()

    const [deliveryDate, setDeliveryDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, address, packageWeight } = formValues
        localStorage.setItem(
            'package',
            JSON.stringify({ address, name, packageWeight, deliveryDate })
        )
        alert('Paquete agregado!')
        const storedPackage = localStorage.getItem('package')

        if (storedPackage !== null) {
            console.log(JSON.parse(storedPackage))
        } else {
            console.log('No hay paquete')
        }
    }

    const buttonOpacityClass = isAddPackageComplete()
        ? 'opacity-100'
        : 'opacity-50'

    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
            <Navbar />
            <MainContainer title={'Agrega'} height={'600px'}>
                   <form
                        className="rounded-xl flex justify-center flex-col p-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="pl-2 border border-solid border-black mb-4 rounded-lg p-2"
                            placeholder="Dirección"
                            value={formValues.address}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            onBlur={(e) =>
                                validateAddress(e.currentTarget.value)
                            }
                            required
                        />{' '}
                        {errors.address && (
                            <span className="text-red-600 text-xs">
                                {errors.address}
                            </span>
                        )}
                        <input
                            className="pl-2 border border-solid border-black mb-4 rounded-lg p-2"
                            placeholder="Nombre de quien recibe"
                            value={formValues.name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            onBlur={(e) => validateName(e.currentTarget.value)}
                            required
                        />{' '}
                        {errors.name && (
                            <span className="text-red-600 text-xs">
                                {errors.name}
                            </span>
                        )}
                        <input
                            className="pl-2 border border-solid border-black rounded-lg p-2"
                            placeholder="Peso del paquete (Kg)"
                            value={formValues.packageWeight}
                            onChange={(e) =>
                                setPackageWeight(e.currentTarget.value)
                            }
                            onBlur={(e) =>
                                validatePackage(e.currentTarget.value)
                            }
                            required
                        />{' '}
                        {errors.packageWeight && (
                            <span className="text-red-600 text-xs">
                                {errors.packageWeight}
                            </span>
                        )}
                        <p className="mt-3">Fecha de entrega</p>
                        <p className="mt-2 border-t border-1 border-dashed border-black"></p>
                        <input
                            type="date"
                            className="pl-2 mt-3 border border-solid border-black rounded-lg p-2"
                            value={deliveryDate}
                            onChange={(e) => {
                                const packageDate = e.currentTarget.value
                                setDeliveryDate(packageDate)
                            }}
                            placeholder="00/00/00"
                            required
                        />
                        <div className="mb-4 absolute right-12 bottom-[110px] flex justify-center">
                            <button
                                type="submit"
                                className={`w-72 py-1 font-bold bg-[#F4C455] rounded-full font-poppins ${buttonOpacityClass}`}
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
            </MainContainer>
        </main>
    )
}
