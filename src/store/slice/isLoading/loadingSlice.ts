import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'isLoading',
    initialState: {
        loginLoading: false,
        registerLoading: false,
        getPackagesLoading: false,
    },
    reducers: {
        setLoginLoading: (state, { payload }) => {
            state.loginLoading = payload
        },
        setRegisterLoading: (state, { payload }) => {
            state.registerLoading = payload
        },
        setGetPackagesLoading: (state, { payload }) => {
            state.getPackagesLoading = payload
        },
    },
})

export const { setLoginLoading, setRegisterLoading, setGetPackagesLoading } =
    loadingSlice.actions
export default loadingSlice.reducer
