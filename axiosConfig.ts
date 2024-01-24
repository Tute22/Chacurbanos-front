import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PORT,
    timeout: 5000,
})

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token')
    }
    return null
}

axiosInstance.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axiosInstance
