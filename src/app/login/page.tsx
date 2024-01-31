'use client'
import Image from 'next/image'
import mainLogo from '../../../public/mainLogo.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import axiosInstance from '../../../axiosConfig'
import MainContainer from '@/commons/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/store/slice/userData/userSlice'
import { setData, setSelectedDay, setUsersData } from '@/store/slice/dbData/dataSlice'
import Spinner from '@/commons/Spinner'
import { CloseEyeIcon } from '@/commons/icons/CloseEyeIcon'
import { OpenEyeIcon } from '@/commons/icons/OpenEyeIcon'
import { UserLogin } from '@/commons/icons/UserLogin'
import { LockIcon } from '@/commons/icons/LockIcon'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()

    const { loginUserData } = useSelector((store: any) => store.userReducer)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSet = async () => {
        if (loginUserData?.user && loginUserData?.user?._id) {
            const response = await axiosInstance.get(`/users/user/${loginUserData.user._id}`)
            const user = response.data

            if (user?.role === 'admin') {
                router.push('/manage-orders')
            } else {
                if (user?.declaration === false && user?.role === 'delivery' && user?.dateBadDeclaration !== '') {
                    const dateBadDeclaration = new Date(user?.dateBadDeclaration)
                    dateBadDeclaration.setDate(dateBadDeclaration.getDate() + 1)

                    if (new Date() > dateBadDeclaration) {
                        axiosInstance.patch(`/users/${user?._id}`, {
                            dateBadDeclaration: '',
                        })
                        router.push('/declaration')
                        return
                    }
                    setIsLoading(false)

                    toast.error('No podes trabajar por 24 horas.')
                } else if (user?.role === 'admin') {
                    toast.success('Logueo exitoso!')
                    router.push('/manage-orders')
                } else if (user?.declaration === true) {
                    toast.success('Logueo exitoso!')
                    router.push('/working-day')
                } else {
                    router.push('/declaration')
                }
            }
        }
    }

    useEffect(() => {
        handleSet()
    }, [])

    const { formValues, errors, validateEmail, validatePassword, setEmail, setPassword, isLoginComplete } = useValidations()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = formValues

        try {
            setIsLoading(true)
            const response = await axiosInstance.post(`/users/login`, {
                email,
                password,
            })

            const { user, token } = response.data

            localStorage.setItem('token', token)
            dispatch(setUser(response.data))

            axiosInstance
                .get(`/packages`)
                .then((response) => {
                    dispatch(setData(response.data))
                })
                .catch((error) => console.error(error))

            axiosInstance
                .get(`/users`)
                .then((response) => {
                    dispatch(setUsersData(response.data))
                })
                .catch((error) => console.error(error))

            const today = new Date()
            today.setHours(0, 0, 0, 0)

            dispatch(
                setSelectedDay({
                    stringDate: today.toLocaleDateString('es-AR'),
                    date: {
                        day: Number(today.toLocaleDateString('es-AR').split('/')[0]),
                        month: Number(today.toLocaleDateString('es-AR').split('/')[1]),
                        year: Number(today.toLocaleDateString('es-AR').split('/')[2]),
                    },
                })
            )

            if (user.status === 'disabled') {
                toast.error('Este usuario esta deshabilitado momentaneamente.')
                setIsLoading(false)
                return
            } else if (user.declaration === false && user.role === 'delivery' && user.dateBadDeclaration !== '') {
                const dateBadDeclaration = new Date(user.dateBadDeclaration)
                dateBadDeclaration.setDate(dateBadDeclaration.getDate() + 1)

                if (new Date() > dateBadDeclaration) {
                    await axiosInstance.patch(`/users/${loginUserData?.user?._id}`, {
                        dateBadDeclaration: '',
                    })
                    router.push('/declaration')
                    return true
                }
                setIsLoading(false)
                toast.error('No podes trabajar por 24 horas.')
            } else if (user.role === 'admin') {
                toast.success('Logueo exitoso!')
                router.push('/manage-orders')
            } else if (user.declaration === true) {
                toast.success('Logueo exitoso!')
                router.push('/working-day')
            } else {
                router.push('/declaration')
            }
        } catch (error) {
            setIsLoading(false)
            toast.warning('Datos inválidos')
            console.error(error)
        }
    }

    const buttonOpacityClass = isLoginComplete() ? 'opacity-100' : 'opacity-50'

    return (
        <div>
            <main className="bg-[#AEE3EF] h-screen">
                <div className="flex justify-center">
                    <Image src={mainLogo} width={280} alt="Logo" className="mt-24" />
                </div>
                <section className="flex justify-center mt-9">
                    <MainContainer title={'Iniciar Sesión'} height="">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 gap-5">
                                <UserLogin className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" />
                                <input
                                    type="email"
                                    className="font-poppins font-normal w-full px-4 py-2 border pl-9 rounded-lg focus:outline-none"
                                    placeholder="nombre@mail.com"
                                    value={formValues.email}
                                    onBlur={(e) => validateEmail(e.currentTarget.value)}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    required
                                />{' '}
                                {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
                            </div>
                            <div className="mb-4">
                                <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" />
                                {showPassword ? (
                                    <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleTogglePassword}>
                                        <CloseEyeIcon className="text-gray-400" />
                                    </button>
                                ) : (
                                    <button type="button" className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer" onClick={handleTogglePassword}>
                                        <OpenEyeIcon className="text-gray-400 " />
                                    </button>
                                )}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="font-poppins font-normal w-full px-4 py-2 pl-9 border rounded-lg focus:outline-none"
                                    placeholder="**********"
                                    value={formValues.password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    onBlur={(e) => validatePassword(e.currentTarget.value)}
                                    required
                                />{' '}
                                {errors.password && <span className="text-red-600 text-xs">{errors.password}</span>}
                            </div>
                            <div className="mb-4">
                                <button
                                    onSubmit={handleSubmit}
                                    className={`font-poppins font-semibold w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                    disabled={!isLoginComplete() || isLoading ? true : false}
                                >
                                    {!isLoading ? 'Ingresar' : <Spinner />}
                                </button>
                            </div>
                        </form>
                        <div>
                            <Link href={'/register'}>
                                <button
                                    disabled={isLoading ? true : false}
                                    className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]"
                                >
                                    Crear Cuenta
                                </button>
                            </Link>
                        </div>
                        <div className="text-center mt-4">
                            <a href="/forgot-password" className="font-poppins font-normal inline-block text-sm">
                                OLVIDÉ MI CONTRASEÑA
                            </a>
                        </div>
                    </MainContainer>
                </section>
            </main>
        </div>
    )
}
