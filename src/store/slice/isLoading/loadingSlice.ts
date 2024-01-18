import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'isLoading',
    initialState: {
        loginLoading: false,
        registerLoading: false,
        getPackagesLoading: false,
        declarationLoading: false,
        createUserLoading: false,
        startWorkLoading: false,
        isLoading: false,
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
        setDeclarationLoading: (state, { payload }) => {
            state.declarationLoading = payload
        },
        setCreateUserLoading: (state, { payload }) => {
            state.createUserLoading = payload
        },
        setStartWorkLoading: (state, { payload }) => {
            state.startWorkLoading = payload
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload
        },
    },
})

export const {
    setLoginLoading,
    setRegisterLoading,
    setGetPackagesLoading,
    setDeclarationLoading,
    setCreateUserLoading,
    setStartWorkLoading,
    setIsLoading,
} = loadingSlice.actions
export default loadingSlice.reducer
