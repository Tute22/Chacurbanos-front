import { useState } from 'react'

interface FormValues {
    name: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    address: string
    packageWeight: string
}

interface FormErrors {
    name?: string
    lastName?: string
    email?: string
    password?: string
    confirmPassword?: string
    address?: string
    packageWeight?: string
}

export const useValidations = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        packageWeight: '',
    })

    const [errors, setErrors] = useState<FormErrors>({})

    const validateName = (name: string) => {
        if (/^[A-Za-z]+$/.test(name)) {
            setErrors((prevErrors) => ({ ...prevErrors, name: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '*Nombre solo con letras',
            }))
            return false
        }
    }

    const validateLastName = (lastName: string) => {
        if (/^[A-Za-z]+$/.test(lastName)) {
            setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                lastName: '*Apellido solo con letras',
            }))
            return false
        }
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
        if (emailRegex.test(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: '*Debe contener @ y dominio',
            }))
            return false
        }
    }

    const validatePassword = (password: string) => {
        if (password.length >= 8) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: '*La contraseña debe ser mayor a 8 caracteres',
            }))
            return false
        }
    }

    const validateConfirmPassword = (
        confirmPassword: string,
        password: string
    ) => {
        if (confirmPassword === password) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: '*Deben ser iguales',
            }))
            return false
        }
    }

    const validateAddress = (address: string) => {
        if (/^[A-Za-z0-9\s]*$/.test(address)) {
            setErrors((prevErrors) => ({ ...prevErrors, address: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: '*Solo caracteres alfanumericos',
            }))
            return false
        }
    }

    const validatePackage = (packageWeight: string) => {
        const stringValue = packageWeight.toString()
        if (/^[0-9]+$/.test(stringValue)) {
            setErrors((prevErrors) => ({ ...prevErrors, packageWeight: '' }))
            return true
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                packageWeight: '*Peso solo admite numeros',
            }))
            return false
        }
    }

    const isLoginComplete = () => {
        return (
            formValues.email.trim() !== '' && formValues.password.trim() !== ''
        )
    }

    const isRegisterComplete = () => {
        return (
            formValues.name.trim() !== '' &&
            formValues.lastName.trim() !== '' &&
            formValues.email.trim() !== '' &&
            formValues.password.trim() !== '' &&
            formValues.confirmPassword.trim() !== ''
        )
    }

    const isAddPackageComplete = () => {
        return (
            formValues.name.trim() !== '' &&
            formValues.address.trim() !== '' &&
            formValues.packageWeight.trim() !== ''
        )
    }

    const setName = (name: string) => {
        setFormValues((prevState) => ({ ...prevState, name }))
    }

    const setLastName = (lastName: string) => {
        setFormValues((prevState) => ({ ...prevState, lastName }))
    }

    const setEmail = (email: string) => {
        setFormValues((prevState) => ({ ...prevState, email }))
    }

    const setPassword = (password: string) => {
        setFormValues((prevState) => ({ ...prevState, password }))
    }

    const setConfirmPassword = (confirmPassword: string) => {
        setFormValues((prevState) => ({ ...prevState, confirmPassword }))
    }

    const setAddress = (address: string) => {
        setFormValues((prevState) => ({ ...prevState, address }))
    }

    const setPackageWeight = (packageWeight: string) => {
        setFormValues((prevState) => ({ ...prevState, packageWeight }))
    }

    return {
        formValues,
        errors,
        validateName,
        validateLastName,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        validateAddress,
        validatePackage,
        setName,
        setLastName,
        setEmail,
        setPassword,
        setConfirmPassword,
        setAddress,
        setPackageWeight,
        isLoginComplete,
        isRegisterComplete,
        isAddPackageComplete,
    }
}
