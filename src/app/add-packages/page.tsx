'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import { useValidations } from '@/hooks/validationHooks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddPackages() {
    const router = useRouter()

    const port = process.env.NEXT_PUBLIC_PORT

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        // CHEQUEA SI ESTA LOGUEADO
        const isAuth = JSON.parse(`${localStorage.getItem('isAuth')}`)
        if (!isAuth) {
            router.push('/login')
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${port}/users/${storedToken}`)
                const decodedToken = response.data
                console.log('Token encontrado y decodificado:', decodedToken)

                if (decodedToken.role !== 'admin') {
                    router.push('/')
                }
            } catch (err) {
                console.error(err)
                // toast.error('Error al intentar obtener usuario.')
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { name, address, packageWeight } = formValues

            await axios.post(`${port}/packages`, {
                address: address,
                recipient: name,
                weight: packageWeight,
                date: deliveryDate,
            })

            toast.success('Paquete agregado!')
        } catch (err) {
            console.error(err)
            toast.warning(
                'Error al intentar crear un paquete nuevo. Verifica los datos e intenta nuevamente.'
            )
        }
    }

    const buttonOpacityClass = isAddPackageComplete()
        ? 'opacity-100'
        : 'opacity-50'

    return (
        <main className="bg-[#AEE3EF] h-screen font-poppins font-normal">
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
