'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import { useValidations } from '@/hooks/validationHooks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function AddPackages() {
    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT

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
                alert('Error al intentar obtener usuario.')
            }
        }

        if (storedToken) {
            fetchData()
        } else {
            router.push('/')
        }
    }, [port, router])

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
            <MainContainer title={'Agregar paquetes'} height={'80%'}>
                <form
                    className="flex justify-center flex-col"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <input
                            className="border border-solid border-black rounded-lg p-2 w-full"
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
                    </div>
                    <div className="mb-4">
                        <input
                            className="border border-solid border-black rounded-lg p-2 w-full"
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
                    </div>
                    <div className="mb-4">
                        <input
                            className="border border-solid border-black rounded-lg p-2 w-full"
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
                    </div>
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
                    <div className="mt-64 flex justify-center">
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
