'use client'
import MainContainer from '@/commons/MainContainer'
import { Navbar } from '@/components/Navbar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useValidations } from '@/hooks/validationHooks'

export default function Declaration() {
    const port = process.env.NEXT_PUBLIC_PORT
    const { loginUserData } = useSelector((store: any) => store.userReducer)
    const router = useRouter()

    const {
        formValues,
        setDeclarationA,
        setDeclarationB,
        setDeclarationC,
        isDeclarationComplete,
    } = useValidations()

    const declarationIsApproved = () => {
        return (
            formValues.a === 'No' &&
            formValues.b === 'No' &&
            formValues.c === 'No'
        )
    }

    const handleSubmitDeclaration = () => {
        if (declarationIsApproved()) {
            axios
                .patch(`${port}/users/${loginUserData?.user._id}`, {
                    declaration: true,
                })
                .then(() => {
                    alert('Declaración jurada firmada correctamente.')
                    router.push('/working-day')
                })
                .catch((error) => {
                    alert('No hemos podido procesar la solicitud.')
                    console.error(error)
                    router.push('/')
                })
        } else {
            axios
                .patch(`${port}/users/${loginUserData?.user._id}`, {
                    dateBadDeclaration: new Date().toString(),
                })
                .then(() => {
                    axios
                        .patch(`${port}/users/${loginUserData?.user._id}`, {
                            declaration: false,
                        })
                        .then(() => {
                            alert('No podes trabajar por 24 horas.')
                            router.push('/')
                        })
                        .catch((error) => {
                            console.error(error)
                            router.push('/')
                        })
                })
                .catch((error) => {
                    console.error(error)
                    router.push('/')
                })
        }
    }

    const buttonOpacityClass = isDeclarationComplete()
        ? 'opacity-100'
        : 'opacity-50'

    return (
        <div className="bg-[#AEE3EF] h-screen">
            <Navbar />
            <section className="flex justify-center">
                <MainContainer title={'Declaración jurada'} height={''}>
                    <div className="">
                        <div className="">
                            <span className="font-poppins font-normal text-xs text-[#55BBD1]">
                                *Requerido
                            </span>
                            <div className="flex flex-col justify-center border border-solid border-black p-2 rounded-lg">
                                <h2 className="text-sm font-poppins font-normal text-center">
                                    ¿Ha consumido bebidas alcohólicas en las
                                    últimas 12 horas?
                                </h2>
                                <div className="flex justify-around m-3 w-60 mx-auto">
                                    <button
                                        onClick={() => setDeclarationA('Si')}
                                        className={`font-poppins font-normal ${
                                            formValues.a === 'Si' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        Si
                                    </button>
                                    <button
                                        onClick={() => setDeclarationA('No')}
                                        className={`font-poppins font-normal ${
                                            formValues.a === 'No' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="font-poppins font-normal text-xs text-[#55BBD1]">
                                *Requerido
                            </span>
                            <div className="flex flex-col justify-center border border-solid border-black p-2 rounded-lg">
                                <h2 className="font-poppins font-normal text-sm text-center">
                                    ¿Usted está haciendo uso de algún tipo de
                                    medicamento psicoactivo?
                                </h2>
                                <i className="text-xs font-poppins font-normal text-center mt-2">
                                    por ejemplo tranquilizantes, antigripales,
                                    antialérgicos o para insomnio.
                                </i>
                                <div className="flex justify-around m-3 w-60 mx-auto">
                                    <button
                                        onClick={() => setDeclarationB('Si')}
                                        className={`font-poppins font-normal ${
                                            formValues.b === 'Si' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        Si
                                    </button>
                                    <button
                                        onClick={() => setDeclarationB('No')}
                                        className={`font-poppins font-normal ${
                                            formValues.b === 'No' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="font-poppins font-normal text-xs text-[#55BBD1]">
                                *Requerido
                            </span>
                            <div className="flex flex-col justify-center border border-solid border-black p-2 rounded-lg">
                                <h2 className="font-poppins font-normal text-sm  text-center">
                                    ¿Tiene usted algún problema familiar,
                                    emocional o de cualquier tipo que lo
                                    distraiga?
                                </h2>
                                <div className="flex justify-around m-3 w-60 mx-auto">
                                    <button
                                        onClick={() => setDeclarationC('Si')}
                                        className={`font-poppins font-normal ${
                                            formValues.c === 'Si' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        Si
                                    </button>
                                    <button
                                        onClick={() => setDeclarationC('No')}
                                        className={`font-poppins font-normal ${
                                            formValues.c === 'No' &&
                                            'bg-[#55BBD1] text-white'
                                        } rounded-full p-1 w-20 border border-solid border-[#55BBD1]`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                handleSubmitDeclaration()
                            }}
                            disabled={!isDeclarationComplete()}
                            className={`font-poppins font-normal w-full px-4 py-2 mt-8 rounded-full bg-[#F4C455] border-solid border-[1px] ${buttonOpacityClass}`}
                        >
                            Continuar
                        </button>
                    </div>
                </MainContainer>
            </section>
        </div>
    )
}
