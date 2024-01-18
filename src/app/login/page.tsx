'use client'
import Image from 'next/image'
import mainLogo from '../../../public/mainLogo.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useValidations } from '@/hooks/validationHooks'
import axios from 'axios'
import MainContainer from '@/commons/MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/store/slice/userData/userSlice'
import { setData, setUsersData } from '@/store/slice/dbData/dataSlice'
import {
    setLoginLoading,
    setRegisterLoading,
} from '@/store/slice/isLoading/loadingSlice'
import Spinner from '@/commons/Spinner'
import { CloseEyeIcon } from '@/commons/icons/CloseEyeIcon'
import { OpenEyeIcon } from '@/commons/icons/OpenEyeIcon'
import { UserLogin } from '@/commons/icons/UserLogin'
import { LockIcon } from '@/commons/icons/LockIcon'
import { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { loginLoading, registerLoading } = useSelector(
        (store: any) => store.loadingReducer
    )

    const port = process.env.NEXT_PUBLIC_PORT
    const { loginUserData } = useSelector((store: any) => store.userReducer)

    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const {
        formValues,
        errors,
        validateEmail,
        validatePassword,
        setEmail,
        setPassword,
        isLoginComplete,
    } = useValidations()

    const handleClick = () => {
        dispatch(setRegisterLoading(true))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { email, password } = formValues

        try {
            dispatch(setLoginLoading(true))
            const response = await axios.post(`${port}/users/login`, {
                email,
                password,
            })

            const { user, token } = response.data

            console.log('TOKEEEEEN >>>', token)

            localStorage.setItem('token', token)
            dispatch(setUser(response.data))

            axios
                .get(`${port}/packages`)
                .then((response) => {
                    dispatch(setData(response.data))
                })
                .catch((error) => console.error(error))

            axios
                .get(`${port}/users`)
                .then((response) => {
                    dispatch(setUsersData(response.data))
                })
                .catch((error) => console.error(error))

            if (
                user.declaration === false &&
                user.role === 'delivery' &&
                user.dateBadDeclaration !== ''
            ) {
                const dateBadDeclaration = new Date(user.dateBadDeclaration)
                dateBadDeclaration.setDate(dateBadDeclaration.getDate() + 1)

                if (new Date() > dateBadDeclaration) {
                    axios.patch(`${port}/users/${loginUserData?.user._id}`, {
                        dateBadDeclaration: '',
                    })
                    alert('Logueo exitoso!')
                    router.push('/declaration')
                }
                alert('No podes trabajar por 24 horas.')
            } else if (user.role === 'admin') {
                alert('Logueo exitoso!')
                router.push('/manage-orders')
            } else {
                alert('Logueo exitoso!')
                router.push('/declaration')
            }
        } catch (error) {
            dispatch(setLoginLoading(false))
            alert('Datos inválidos')
            console.error(error)
        }
    }

    const buttonOpacityClass = isLoginComplete() ? 'opacity-100' : 'opacity-50'

    return (
        <div>
            <main className="bg-[#AEE3EF] h-screen">
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={280}
                        alt="Logo"
                        className="mt-24"
                    />
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
                                    onBlur={(e) =>
                                        validateEmail(e.currentTarget.value)
                                    }
                                    onChange={(e) =>
                                        setEmail(e.currentTarget.value)
                                    }
                                    required
                                />{' '}
                                {errors.email && (
                                    <span className="text-red-600 text-xs">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <LockIcon className=" text-gray-400 w-6 h-6 mr-2 ml-1 mt-2 absolute" />
                                {showPassword ? (
                                    <button
                                        type="button"
                                        className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                        onClick={handleTogglePassword}
                                    >
                                        <CloseEyeIcon className="text-gray-400" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-5 h-6 mr-2 ml-[253px] mt-2 absolute cursor-pointer"
                                        onClick={handleTogglePassword}
                                    >
                                        <OpenEyeIcon className="text-gray-400 " />
                                    </button>
                                )}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="font-poppins font-normal w-full px-4 py-2 pl-9 border rounded-lg focus:outline-none"
                                    placeholder="**********"
                                    value={formValues.password}
                                    onChange={(e) =>
                                        setPassword(e.currentTarget.value)
                                    }
                                    onBlur={(e) =>
                                        validatePassword(e.currentTarget.value)
                                    }
                                    required
                                />{' '}
                                {errors.password && (
                                    <span className="text-red-600 text-xs">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <div className="mb-4">
                                <button
                                    onSubmit={handleSubmit}
                                    className={`font-poppins font-semibold w-full px-4 py-2 bg-[#F4C455] rounded-full ${buttonOpacityClass}`}
                                    disabled={
                                        !isLoginComplete() ||
                                        loginLoading ||
                                        registerLoading
                                            ? true
                                            : false
                                    }
                                >
                                    {!loginLoading ? 'Ingresar' : <Spinner />}
                                </button>
                            </div>
                        </form>
                        <div>
                            <Link href={'/register'}>
                                <button
                                    disabled={
                                        loginLoading || registerLoading
                                            ? true
                                            : false
                                    }
                                    onClick={handleClick}
                                    className="font-poppins font-normal w-full px-4 py-2 rounded-full border-[#F4C455] border-solid border-[1px]"
                                >
                                    {!registerLoading ? (
                                        'Crear Cuenta'
                                    ) : (
                                        <Spinner />
                                    )}
                                </button>
                            </Link>
                        </div>
                        <div className="text-center mt-4">
                            <a
                                href="#"
                                className="font-poppins font-normal inline-block text-sm"
                            >
                                OLVIDÉ MI CONTRASEÑA
                            </a>
                        </div>
                    </MainContainer>
                </section>
            </main>
        </div>
    )
}
